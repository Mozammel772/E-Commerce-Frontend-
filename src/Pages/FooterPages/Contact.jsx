import { useRef } from "react";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // emailjs
    //   .sendForm(
    //     "service_ygsmvq1", // Your actual service ID
    //     "template_kuf34hv", // Your template ID
    //     form.current,
    //     "tff5NPFDtnvkxF1bt" // Your public key (User ID for old emailjs-com)
    //   )
    //   .then(
    //     (result) => {
    //       alert("✅ Message sent successfully!");
    //       form.current.reset(); // Optional: reset form after sending
    //     },
    //     (error) => {
    //       console.error(error);
    //       alert("❌ Failed to send message. Please try again.");
    //     }
    //   );
  };

  return (
    <div className="bg-[#f7fdfc] py-16 px-6 md:px-20">
      <div className="text-center mb-10">
        <TittleAnimation
          tittle="Contact Us "
          subtittle="Contact More Information"
        />
        <p className="text-lg font-semibold mt-4">Send Us a Message</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        {/* Left Image */}
        <div className="flex justify-center">
          <img
            src="/contact-img.png"
            alt="24/7 Support"
            className="w-full max-w-md"
          />
        </div>

        {/* Right Form */}
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <input
            type="text"
            name="user_name"
            placeholder="Enter Your Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="user_phone"
            placeholder="Enter Your Mobile Number"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Enter Subject"
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="message"
            className="textarea textarea-bordered w-full h-32"
            placeholder="Type Your Message"
            required
          ></textarea>
          <button
            type="submit"
            className="btn bg-green-800 hover:bg-green-900 text-white font-bold px-8"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
