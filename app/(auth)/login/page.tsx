import { Header } from "../_components/header";
import { Footer } from "../_components/footer";
import { LoginForm } from "../_components/login-form";

const Login = () => {
   return (
      <section className="flex justify-center items-center p-4 min-h-screen bg-gray-100">
         <div className="max-w-xl w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
            <Header
               heading="Welcome Back to Events!"
               paragraph="Sign in to continue seeing events"
            />
            <LoginForm />
            <Footer
               paragraph="Not a member yet?"
               link="Register"
               href="/register"
            />
         </div>
      </section>
   )
};

export default Login;