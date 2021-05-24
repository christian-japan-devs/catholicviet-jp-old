import Link from "next/link"

const Copyright = () => {
  return (
    <div >
      {'Copyright © '}
      <Link href="https://vietcatholicjp.com/">
        Vietcatholic Jp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </div>
  );
};

export default Copyright;
