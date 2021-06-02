## How to set up Cloud Build to build and deploy Django app

```bash
# Allow Cloud Build to access 
gcloud projects add-iam-policy-binding catholicviet-jp \
    --member serviceAccount:1087689437448@cloudbuild.gserviceaccount.com \
    --role roles/cloudsql.client
```
