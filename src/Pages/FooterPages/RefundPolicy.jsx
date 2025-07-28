import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const RefundPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Mathematics | Refund Policy</title>
      </Helmet>
      <div className="px-2 py-6 max-w-4xl mx-auto">
        <TittleAnimation
          tittle="Refund Policy"
          subtittle="Follow Refund Policy"
        />

        <motion.p
          className="text-lg text-justify mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          At <strong>Mathematics</strong>, we are committed to delivering
          high-quality educational content and a smooth learning experience. To
          ensure clarity and fairness for all users, please read our refund and
          return policy carefully.
        </motion.p>

        <motion.h2
          className="text-xl font-semibold text-blue-700 mb-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          🔁 Return & Exchange Policy
        </motion.h2>
        <motion.ul
          className="list-disc list-inside mb-6 text-justify text-base space-y-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <li>
            Due to the digital nature of our courses and materials, we{" "}
            <strong>do not accept returns</strong> once a course has been
            purchased or accessed.
          </li>
          <li>
            Course access is strictly <strong>non-transferable</strong> and
            cannot be exchanged for another course.
          </li>
        </motion.ul>

        <motion.h2
          className="text-xl font-semibold text-blue-700 mb-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          💸 Refund Eligibility
        </motion.h2>
        <motion.ul
          className="list-disc list-inside mb-6 text-justify text-base space-y-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <li>
            Refunds are <strong>not provided by default</strong> once a payment
            is completed.
          </li>
          <li>
            In rare cases (e.g., duplicate payment or complete technical failure
            to access the course), you may request a refund within{" "}
            <strong>48 hours</strong> of purchase.
          </li>
          <li>
            Refund requests must be submitted via email to{" "}
            <a
              href="mailto:support@Mathematics.com"
              className="text-blue-600 underline"
            >
              support@Mathematics.com
            </a>{" "}
            along with payment details.
          </li>
        </motion.ul>

        <motion.h2
          className="text-xl font-semibold text-blue-700 mb-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
        >
          ⚠️ Important Notes
        </motion.h2>
        <motion.ul
          className="list-disc list-inside mb-6 text-justify text-base space-y-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={7}
        >
          <li>
            If more than <strong>20% of the course</strong> has been viewed or
            downloaded, refund requests will not be accepted.
          </li>
          <li>
            Mathematics reserves the right to <strong>deny refunds</strong> that
            do not comply with our policy.
          </li>
        </motion.ul>

        <motion.p
          className="text-base text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={8}
        >
          ✅ Our team is always here to support you. If you're experiencing
          issues, please reach out — we’ll do our best to help!
        </motion.p>
      </div>
    </>
  );
};

export default RefundPolicy;
