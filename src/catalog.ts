// The routing surface, shared by the API and the website so the documentation cannot drift.
export const modules = ['wtf', 'excuse', 'decide', 'status', 'ack', 'blame', 'eta', 'reason', 'placeholder'] as const;
export const descriptions: Record<string, string> = { wtf:'Explain confusing technical things.', excuse:'Generate a scenario-appropriate excuse.', decide:'Make a lightweight decision.', status:'Generate a compact status update.', ack:'Acknowledge receipt or action.', blame:'Name a plausible systems culprit.', eta:'Interpret a small duration estimate.', reason:'Explain an action responsibly.', placeholder:'Generate useful fictional fixture data.' };
export const etaCategories = ['software', 'deploy', 'contractor', 'meeting', 'download', 'migration', 'support', 'manager', 'honest'];
export const placeholderCategories = ['startup', 'saas', 'ecommerce', 'github', 'status-page', 'blog', 'news', 'legal', 'medical', 'finance', 'restaurant', 'portfolio', 'dashboard', 'social', 'reviews', 'users', 'products'];
export const placeholderKinds = ['card', 'text', 'product', 'issue', 'profile', 'review', 'article', 'commit', 'status', 'company'];
export const placeholderDefaultKinds: Record<string, string> = { saas:'text', ecommerce:'product', github:'issue' };
