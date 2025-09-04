import React,{useState} from "react";
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
import { useForm } from "react-hook-form";



const Contact = () => {
    const[isSubmitting, setIsSubmitting] = useState(false);
    const{register,
        handleSubmit,
        reset,
        formState:{errors}
    } = useForm();


    const handleChange = (e) =>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async(data)=>{
        setIsSubmitting(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, data);
            toast.success('Thank You For Contacting us',{
                duration:5000
            });
            reset();
        } catch (error) {
            toast.error('Something Went Wrong, please try again');
            console.error(error);
        }finally{
            setIsSubmitting(false)
        }
    };

  return (
    <form 
    onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col items-center text-sm">
      <p className="text-lg text-green-600 font-medium pb-2">Contact Us</p>
      <h1 className="text-4xl font-semibold text-slate-700 pb-4">
        Get in touch with us
      </h1>
      <p className="text-md text-gray-500 text-center pb-10">
        We would like to here from You.
        <br />
        Please feel free to reach out to us via Our email or phone.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
        <div className="w-full">
          <label className="text-black/70" htmlFor="name">
            Your Name
          </label>
          <input
            onChange={handleChange}
            className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-green-300"
            type="text"
            {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Please input Correct name format"
                }
              })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>
        <div className="w-full">
          <label className="text-black/70" htmlFor="name">
            Your Email
          </label>
          <input
            onChange={handleChange}
            className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-green-300"
            type="email"
             {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format"
                }
              })}
          />
           {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
       
      </div>

      <div className="mt-6 w-[350px] md:w-[700px]">
        <label className="text-black/70" htmlFor="name">
          Message
        </label>
        <textarea
          className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-green-300"
           {...register("message", { required: true })}
        ></textarea>
      </div>

      <button
        type="submit"
           className={`mt-5 bg-green-600 text-white w-56 px-4 py-4 rounded active:scale-95 transition  ${
              isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-[#0A2342] hover:bg-green-300'
            }`}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default Contact;
