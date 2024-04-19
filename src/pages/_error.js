import { useRouter } from "next/router"

function Error({ statusCode }) {
    const router = useRouter()

    statusCode == 401 ? router.push("/auth/login") : null
    return (
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    )
  }
   
  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : err.statusCode == 401 ? 401 : 404
    return { statusCode }
  }
   
  export default Error