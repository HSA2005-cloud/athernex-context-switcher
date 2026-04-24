import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-brand">
          <div className="auth-logo">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3" fill="white" />
              <circle cx="8" cy="8" r="6.5" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          </div>
          <h1 className="auth-title">ContextMind</h1>
          <p className="auth-subtitle">AI Context Preservation System</p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: 'clerk-root',
              card: 'clerk-card',
              headerTitle: 'clerk-header-title',
              headerSubtitle: 'clerk-header-subtitle',
              formButtonPrimary: 'clerk-btn-primary',
              footerActionLink: 'clerk-footer-link',
              formFieldInput: 'clerk-input',
              identityPreviewEditButton: 'clerk-edit-btn',
              formFieldLabel: 'clerk-label',
              dividerLine: 'clerk-divider',
              dividerText: 'clerk-divider-text',
              socialButtonsBlockButton: 'clerk-social-btn',
            },
            variables: {
              colorPrimary: '#7c6dfa',
              colorBackground: '#16161f',
              colorText: '#f0effe',
              colorTextSecondary: '#9b99b8',
              colorInputBackground: '#1a1a25',
              colorInputText: '#f0effe',
              borderRadius: '10px',
              fontFamily: "'Inter', sans-serif",
            },
          }}
        />
      </div>
    </div>
  );
}
