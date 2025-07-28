import { motion } from "framer-motion";
import {
  Cookie,
  FileLock,
  Info,
  LockKeyhole,
  Phone,
  RefreshCcw,
  Share2,
  User,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

// Animation variants (like About page)
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const PrivacyPolicy = () => {
  return (
    <div>
      <Helmet>
        <title>Mathematics | Privacy Policy</title>
      </Helmet>
      <div>
        <motion.div
          className="px-4 py-6 max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Animated Title */}
          <motion.div variants={fadeInUp}>
            <TittleAnimation
              tittle=" Privacy Policy"
              subtittle="Follow Privacy Policy"
            />
          </motion.div>

          {/* Intro Paragraph */}
          <motion.p
            className="text-lg mb-6 text-justify leading-relaxed"
            variants={fadeInUp}
          >
            Your privacy is important to us. We are committed to protecting your
            personal information and ensuring it is not used in any unauthorized
            way.
          </motion.p>

          {/* Animated Sections */}
          {[
            {
              icon: <User className="text-blue-600" />,
              title: "1. Information We Collect",
              content: (
                <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                  <li>
                    Your name, mobile number, email address, and home address
                  </li>
                  <li>Account-related details (if you register on our site)</li>
                  <li>Your browsing behavior and any feedback you provide</li>
                </ul>
              ),
            },
            {
              icon: <Info className="text-yellow-600" />,
              title: "2. Use of Information",
              content: (
                <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                  <li>To provide our services</li>
                  <li>To communicate with you</li>
                  <li>To improve user experience</li>
                  <li>To fulfill legal and security obligations</li>
                </ul>
              ),
            },
            {
              icon: <Share2 className="text-orange-600" />,
              title: "3. Information Sharing",
              content: (
                <>
                  <p className="mb-4 text-lg text-justify">
                    We do not share your personal information with any third
                    party, except:
                  </p>
                  <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                    <li>When required by law</li>
                    <li>With your explicit permission</li>
                    <li>
                      With partner service providers working on our behalf
                    </li>
                  </ul>
                </>
              ),
            },
            {
              icon: <Cookie className="text-pink-600" />,
              title: "4. Cookies",
              content: (
                <p className="mb-6 text-lg text-justify">
                  We use cookies to enhance your experience and track website
                  performance. You can choose to disable cookies in your browser
                  settings.
                </p>
              ),
            },
            {
              icon: <FileLock className="text-red-600" />,
              title: "5. Data Security",
              content: (
                <p className="mb-6 text-lg text-justify">
                  We use secure technologies and conduct regular security audits
                  to protect your data. However, we cannot guarantee 100%
                  security on the internet.
                </p>
              ),
            },
            {
              icon: <LockKeyhole className="text-purple-600" />,
              title: "6. User Rights",
              content: (
                <>
                  <p className="mb-4 text-lg text-justify">
                    You have the right to:
                  </p>
                  <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                    <li>View and update your data</li>
                    <li>Request deletion of your account or data</li>
                    <li>Contact us for any privacy-related queries</li>
                  </ul>
                </>
              ),
            },
            {
              icon: <RefreshCcw className="text-indigo-600" />,
              title: "7. Policy Changes",
              content: (
                <p className="mb-6 text-lg text-justify">
                  We may update this privacy policy as needed. Please review
                  this page periodically to stay informed about any changes.
                </p>
              ),
            },
            {
              icon: <Phone className="text-green-700" />,
              title: "8. Contact Us",
              content: (
                <>
                  <p className="mb-2 text-lg">
                    📧 Email:{" "}
                    <a
                      href="mailto:support@yourdomain.com"
                      className="text-blue-600 underline"
                    >
                      support@yourdomain.com
                    </a>
                  </p>
                  <p className="text-lg mb-10">
                    📞 Phone:{" "}
                    <a
                      href="tel:+8801XXXXXXXXX"
                      className="text-blue-600 underline"
                    >
                      +8801XXXXXXXXX
                    </a>
                  </p>
                </>
              ),
            },
          ].map((section, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
                {section.icon}
                {section.title}
              </h2>
              {section.content}
            </motion.div>
          ))}

          {/* Final Note */}
          <motion.p
            className="text-xl font-semibold text-blue-700 text-justify"
            variants={fadeInUp}
          >
            🔒 We respect your trust — and we’re committed to keeping your data
            safe.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
