## Setup Django app infra

### First, download and install:
* google-cloud-sdk to provide gcloud command: `brew install --cask google-cloud-sdk`
* postgres to provide psql command: `brew install postgres`
* FiloSottile/age and mozilla/sops to encrypt, decrypt secrets: 
  * `brew tap filippo.io/age https://filippo.io/age && brew install age`
  * `brew install sops`


### Follow the instruction here to create the Django app infra
```bash
gcloud auth login

# Create Cloud SQL instance
gcloud sql instances create prod-catholicviet-jp \
    --project catholicviet-jp \
    --database-version POSTGRES_13 \
    --tier db-f1-micro \
    --zone asia-northeast1-a \
    --assign-ip \
    --availability-type=zonal \
    --backup \
    --require-ssl \
    --enable-point-in-time-recovery \
    --maintenance-window-day=WED \
    --maintenance-window-hour=16 \
    --storage-auto-increase \
    --storage-size=10GB \
    --storage-type=SSD

# Output:

ERROR: (gcloud.sql.instances.create) Operation
https://sqladmin.googleapis.com/sql/v1beta4/projects/catholicviet-jp/operations/e47...
is taking longer than expected. You can continue waiting for the operation by
running `gcloud beta sql operations wait --project catholicviet-jp e47...`

# This is fine. Check the Google Cloud console to make sure the instance
  sucessfully created

# Set password for 'postgres' user
gcloud sql users set-password postgres \
    --instance prod-catholicviet-jp --prompt-for-password

# Create database
gcloud sql databases create users \
    --instance prod-catholicviet-jp

# Download Cloud SQL Auth proxy
curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64
chmod +x cloud_sql_proxy

# Run the Cloud SQL Auth proxy so we can connect to the DB from our local machine
# First, run the proxy to open a tunnel for connection
./cloud_sql_proxy -instances catholicviet-jp:asia-northeast1:prod-catholicviet-jp=tcp:0.0.0.0:5432

# Then connect to the Postgres DB using psql command
psql -U postgres -h localhost

# Output:
postgres=>

# Create user for Django app and grant the permission
CREATE USER "django" WITH PASSWORD '<your password>';
GRANT ALL PRIVILEGES ON DATABASE "users" TO "django";
\q

# Now setup a bucket to store media uploaded by users
gsutil mb -l asia-northeast1 gs://catholicviet-jp
gsutil defacl set public-read gs://catholicviet-jp

# Now start set up django environment
# First, we need to set up a few environment variables

cat <<EOF > django.env
DB_CLOUD_CONNECTION=postgres://django:<your password>@//cloudsql/catholicviet-jp:asia-northeast1:prod-catholicviet-jp/users
GS_BUCKET_NAME=catholicviet-jp
SECRET_KEY=<django secret key>
DB_NAME=users
DB_USER=django
DB_PASSWORD=
DB_PORT=
ALLOWED_HOSTS='localhost catholicviet.jp'
EOF

# Then we generate an `age` key that used to encrypt the secret
age-keygen -o keys.txt
# Output:
Public key: age1fl...

# Next, create `sops` config that use `age` public key
cat > .sops.yaml <<EOH
creation_rules:
  - path_regex: (\.enc)?\.(json|yaml|yml|env|ini|bin)$
    age: age1fl...
EOH

# After that specify the path to `age`'s `keys.txt` file
export SOPS_AGE_KEY_FILE=/path/to/keys.txt

# Run `sops` to encrypt the secret file `.env`
sops -e django.env > django.enc.env

# Do not commit the secret file to git
echo '**/secrets/*.*' >> .gitignore
echo '!**/secrets/*.enc.*' >> .gitignore
echo keys.txt >> .gitignore
```
