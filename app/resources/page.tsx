import PasswordProtected from "@/components/PasswordProtected";

export default function ResourcesPage() {
  const RESOURCES_PASSWORD_HASH =
    "c88d15cc19d169a10b7643d64c8ac8835c1295c1d4aa44ff493520856c2d310d"; // SHA-256 of "sercutalei@123"

  return (
    <PasswordProtected
      passwordHash={RESOURCES_PASSWORD_HASH}
      sessionKey="resourcesSessionTimestamp"
      title="Lab Resources"
      description="Enter password to access lab resources"
    >
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
          Lab Resources
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-300 mb-6">
          This area can be used to share internal documents, links, and other resources for the lab.
        </p>
      </div>
    </PasswordProtected>
  );
}

