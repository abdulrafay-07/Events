import { Header } from "../_components/header";
import { Footer } from "../_components/footer";
import { RegisterationForm } from "../_components/registeration-form";

const Register = () => {
   return (
      <section className="flex justify-center items-center p-4 min-h-screen bg-gray-100">
         <div className="max-w-xl w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
            <Header
               heading="Join Events Today!"
               paragraph="Sign up to start creating and joining events."
            />
            <RegisterationForm />
            <Footer
               paragraph="Already a member?"
               link="Login"
               href="/login"
            />
         </div>
      </section>
   )
};

export default Register;