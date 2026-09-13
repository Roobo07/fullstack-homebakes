'use client';

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4 max-w-2xl py-8 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">Edit Profile</h1>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">Personal Information</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
              <input type="text" className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 outline-none dark:text-zinc-100" defaultValue="John" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
              <input type="text" className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 outline-none dark:text-zinc-100" defaultValue="Doe" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input type="email" className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 rounded-lg p-2.5 outline-none text-gray-500 dark:text-gray-400 cursor-not-allowed" defaultValue="john.doe@example.com" disabled />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
            <input type="tel" className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 outline-none dark:text-zinc-100" defaultValue="+91 9876543210" />
          </div>
          <div className="pt-4">
            <button type="button" className="bg-amber-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-amber-700 transition shadow-sm">Save Changes</button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">Change Password</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
            <input type="password" className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 outline-none dark:text-zinc-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
            <input type="password" className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 outline-none dark:text-zinc-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
            <input type="password" className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 outline-none dark:text-zinc-100" />
          </div>
          <div className="pt-4">
            <button type="button" className="bg-zinc-800 dark:bg-zinc-700 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-zinc-900 dark:hover:bg-zinc-600 transition shadow-sm">Update Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}
