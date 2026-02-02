import ResetPasswordPage from '@/components/auth/ResetPasswordPage';

export default function ResetPassword({ params }: { params: Promise<{ token: string; locale: string }> }) {
  return <ResetPasswordPage params={params} />;
}

