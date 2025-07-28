import { motion } from "framer-motion";
import { AlertCircle, Ban, FileText, Globe, Link2, ShieldCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Mathematics | Terms & Conditions</title>
      </Helmet>
      <div className="px-2 py-5">
        <TittleAnimation tittle="Terms & Conditions"  subtittle="Follow Terms & Conditions"/>

        <motion.h1
          className="text-3xl lg:text-4xl font-bold mb-8 text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Welcome to Mathematics
        </motion.h1>

        <motion.p
          className="mb-6 text-lg leading-relaxed text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          By accessing and using our website at{" "}
          <a
            href="https://Mathematicsonline.com"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mathematicsonline.com
          </a>
          , you agree to be bound by these terms and conditions. Please read them carefully.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <ShieldCheck className="text-green-600" />
          Use of Cookies
        </motion.h2>
        <motion.p className="mb-6 text-lg text-justify" variants={fadeUp} initial="hidden" animate="visible" custom={4}>
          We use cookies to enhance your experience. By continuing to browse our site, you consent to our use of cookies in accordance with our Privacy Policy.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold mb-4 flex items-center gap-2" variants={fadeUp} initial="hidden" animate="visible" custom={5}>
          <FileText className="text-purple-600" />
          Intellectual Property
        </motion.h2>
        <motion.p className="mb-6 text-lg text-justify" variants={fadeUp} initial="hidden" animate="visible" custom={6}>
          All content on Mathematics is protected by copyright and belongs to Mathematics or its licensors. You may use content for personal, non-commercial purposes only. You may not reproduce, sell, or redistribute any material.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold mb-4 flex items-center gap-2" variants={fadeUp} initial="hidden" animate="visible" custom={7}>
          <Link2 className="text-cyan-600" />
          Hyperlinking
        </motion.h2>
        <motion.p className="mb-6 text-lg text-justify" variants={fadeUp} initial="hidden" animate="visible" custom={8}>
          Certain organizations such as government bodies, search engines, and news outlets may link to our site without prior approval. Others must request permission first.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold mb-4 flex items-center gap-2" variants={fadeUp} initial="hidden" animate="visible" custom={9}>
          <Ban className="text-red-600" />
          iFrames Policy
        </motion.h2>
        <motion.p className="mb-6 text-lg text-justify" variants={fadeUp} initial="hidden" animate="visible" custom={10}>
          You may not create frames or alter the visual presentation of our pages without prior written consent.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold mb-4 flex items-center gap-2" variants={fadeUp} initial="hidden" animate="visible" custom={11}>
          <AlertCircle className="text-orange-500" />
          Content Liability
        </motion.h2>
        <motion.p className="mb-6 text-lg text-justify" variants={fadeUp} initial="hidden" animate="visible" custom={12}>
          We are not responsible for content that appears on external websites linking to us. You agree to defend us against claims arising from content on your site that links to Mathematics.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold mb-4 flex items-center gap-2" variants={fadeUp} initial="hidden" animate="visible" custom={13}>
          <Globe className="text-blue-500" />
          Link Removal
        </motion.h2>
        <motion.p className="mb-6 text-lg text-justify" variants={fadeUp} initial="hidden" animate="visible" custom={14}>
          If you find any link on our site objectionable, you may inform us. We will consider removal requests, but we are not obligated to act or respond directly.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold mb-4 flex items-center gap-2" variants={fadeUp} initial="hidden" animate="visible" custom={15}>
          <ShieldCheck className="text-gray-700" />
          Disclaimer
        </motion.h2>
        <motion.p className="mb-6 text-lg text-justify" variants={fadeUp} initial="hidden" animate="visible" custom={16}>
          We do not guarantee the accuracy, completeness, or availability of information on our site. Mathematics will not be liable for any damages resulting from the use of our website.
        </motion.p>

        <motion.p
          className="text-xl font-semibold text-emerald-700 mt-10 text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={17}
        >
          📘 Thank you for trusting Mathematics. If you have any questions about these terms, please contact us.
        </motion.p>
      </div>
    </>
  );
};

export default TermsAndConditions;
