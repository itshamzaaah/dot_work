import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resolveInvite } from "../../src/services";

const InviteLanding = () => {
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      toast.error("Missing invite token");
      navigate("/", { replace: true });
      return;
    }

    const verifyInvite = async () => {
      try {
        const response = await resolveInvite(token);
        console.log("Invite resolved:", response);

      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to resolve invite");
        // navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    verifyInvite();
  }, [params, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 shadow rounded-xl p-8 max-w-md w-full text-center">
        {loading ? (
          <>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Verifying your invite…
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Please wait while we validate your test invitation.
            </p>
            <div className="mt-6">
              <div className="loader border-4 border-blue-500 border-dashed rounded-full w-12 h-12 mx-auto animate-spin"></div>
            </div>
          </>
        ) : (
          <h1 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            Redirecting…
          </h1>
        )}
      </div>
    </div>
  );
};

export default InviteLanding;
