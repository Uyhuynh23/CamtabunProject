import { motion } from "framer-motion";
import {
  Sparkles, UserCheck, FileText, UploadCloud, KeyRound,
  ShoppingCart, Gift, ShieldCheck, ArrowRightLeft, Eye as EyeIcon
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function HowItWorksSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-6xl mx-auto my-20 px-4"
    >
      <motion.h2
        className="text-2xl md:text-6xl font-extrabold text-center mb-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
        variants={fadeIn}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
      <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8 drop-shadow-lg text-center animate-pulse">
        How It Works
        </h1>
      </motion.h2>
      <motion.div
        className="grid md:grid-cols-2 gap-12"
        variants={fadeIn}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* Publisher flow */}
        <motion.div
          className="bg-white/90 rounded-3xl shadow-xl p-8 border-2 border-purple-100 flex flex-col justify-between"
          whileHover={{ scale: 1.025, boxShadow: "0 8px 32px 0 rgba(80,0,120,0.10)" }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-7 flex items-center gap-3 text-blue-700 drop-shadow">
              <UserCheck className="w-8 h-8" /> For Publishers
            </h3>
            <ol className="space-y-7">
              <li className="flex items-start gap-4">
                <UserCheck className="w-9 h-9 text-blue-500 mt-1 drop-shadow" />
                <div>
                  <div className="font-bold text-lg md:text-xl">Register Contract</div>
                  <div className="text-gray-600 text-base md:text-lg">
                    Sign a physical contract with our team.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FileText className="w-9 h-9 text-purple-500 mt-1 drop-shadow" />
                <div>
                  <div className="font-bold text-lg md:text-xl">Submit Voucher Info</div>
                  <div className="text-gray-600 text-base md:text-lg">
                    Contact the team to discuss and submit voucher details.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <UploadCloud className="w-9 h-9 text-pink-500 mt-1 drop-shadow" />
                <div>
                  <div className="font-bold text-lg md:text-xl">Team Uploads NFT</div>
                  <div className="text-gray-600 text-base md:text-lg">
                    Our team uploads the voucher as an NFT, under your ownership.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <KeyRound className="w-9 h-9 text-cyan-500 mt-1 drop-shadow" />
                <div>
                  <div className="font-bold text-lg md:text-xl">Get Access</div>
                  <div className="text-gray-600 text-base md:text-lg">
                    Receive a platform account to manage sales and redemptions.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Sparkles className="w-9 h-9 text-yellow-500 mt-1 drop-shadow" />
                <div>
                  <div className="font-bold text-lg md:text-xl">Start Selling</div>
                  <div className="text-gray-600 text-base md:text-lg">
                    Track, sell, and manage vouchers on the platform.
                  </div>
                </div>
              </li>
            </ol>
          </div>
          <div className="mt-8 text-center">
            <span className="inline-block text-lg md:text-xl font-semibold text-purple-700 bg-purple-50 rounded-xl px-4 py-2 shadow-sm">
              Interested in becoming a publisher?<br />
              <span className="text-pink-600 font-bold">Contact us</span> for more details!
            </span>
          </div>
        </motion.div>
        {/* User flow */}
        <motion.div
          className="bg-white/90 rounded-3xl shadow-xl p-8 border-2 border-pink-100 flex flex-col justify-between"
          whileHover={{ scale: 1.025, boxShadow: "0 8px 32px 0 rgba(200,0,120,0.10)" }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-7 flex items-center gap-3 text-pink-700 drop-shadow">
              <ShoppingCart className="w-8 h-8" /> For Users
            </h3>
            <ol className="space-y-7">
              <li className="flex items-start gap-4">
                <ShieldCheck className="w-9 h-9 text-green-500 mt-1 drop-shadow" />
                <div>
                  <div className="font-bold text-lg md:text-xl">Connect Phantom Wallet</div>
                  <div className="text-gray-600 text-base md:text-lg">
                    Anyone with a Phantom Solana wallet can join and use the platform.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <ShoppingCart className="w-9 h-9 text-blue-500 mt-1 drop-shadow" />
                <div>
                  <div className="font-bold text-lg md:text-xl">Buy Vouchers</div>
                  <div className="text-gray-600 text-base md:text-lg">
                    Purchase vouchers directly from the marketplace.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <ArrowRightLeft className="w-9 h-9 text-purple-500 mt-1 drop-shadow" />
                <div>
                  <div className="font-bold text-lg md:text-xl">Resell or Gift</div>
                  <div className="text-gray-600 text-base md:text-lg">
                    Resell your voucher if you don't need it, or gift it to another user.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Gift className="w-9 h-9 text-pink-500 mt-1 drop-shadow" />
                <div>
                  <div className="font-bold text-lg md:text-xl">Transparency & Protection</div>
                  <div className="text-gray-600 text-base md:text-lg">
                    All vouchers are NFTs, ensuring transparency and protecting users from scams.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <EyeIcon className="w-9 h-9 text-cyan-500 mt-1 drop-shadow" />
                <div>
                  <div className="font-bold text-lg md:text-xl">Easy Management</div>
                  <div className="text-gray-600 text-base md:text-lg">
                    Store, view, and manage all your vouchers in one place—never lose a voucher again.
                  </div>
                </div>
              </li>
            </ol>
          </div>
          <div className="mt-8 text-center">
            <span className="inline-block text-base md:text-lg font-semibold text-pink-700 bg-pink-50 rounded-xl px-4 py-2 shadow-sm">
              Join with us to access exclusive NFT vouchers and special deals only available on <span className="font-bold text-purple-600">VoSo</span>!
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}