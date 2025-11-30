export default function Footer() {
  return (
    <footer className="bg-[#07132B] text-gray-400 py-6 text-center mt-10">

      <p className="text-sm">
        © {new Date().getFullYear()} Coxdiack Group. All rights reserved.
      </p>

      {/* Hidden Admin Login Link */}
      <a
        href="/admin/login"
        className="text-xs text-gray-600 hover:text-white opacity-0 hover:opacity-100 transition"
      >
        Admin Login
      </a>
    </footer>
  );
}
