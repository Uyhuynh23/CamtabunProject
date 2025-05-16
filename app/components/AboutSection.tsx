export default function AboutSection() {
  return (
    <div className="bg-slate-900/80 rounded-2xl p-6 mb-2 shadow-lg border border-cyan-400/20">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
        Giới thiệu về VoSo
      </h1>
      <p className="text-slate-200 text-base">
        <b>VoSo</b> là nền tảng giúp bạn mua bán, trao đổi voucher một cách minh bạch, nhanh chóng và an toàn.<br />
        - Đăng nhập để bắt đầu giao dịch voucher.<br />
        - Quản lý các voucher bạn sở hữu.<br />
        - Đăng ký trở thành <b>Publisher</b> để phát hành voucher cho cộng đồng.<br />
        <span className="text-cyan-300">Trải nghiệm giao dịch voucher hiện đại, tiện lợi cùng VoSo!</span>
      </p>
    </div>
  )
}