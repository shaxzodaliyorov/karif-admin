export type apiRoutes = keyof typeof API_ROUTES;

export const API_ROUTES = {
  auth: {
    login: '/home/login',
    me: '/home/me',
    signUpWorker: '/worker/sign-up',
    signUpAgency: '/agency/sign-up',
    signUpCompany: '/company/sign-up',
    updatePassword: '/admin/update-password',
    signUpKoreanAgency: '/korean-agency/sign-up',
  },
  worker: {
    getAll: '/worker/get-all',
    verifyWorker: '/worker/verify-worker',
    loginWorkerWithAdmin: '/worker/login-worker-with-admin',
  },
  agency: {
    getAll: '/agency/get-all',
    verifyAgency: '/agency/verify-agency',
    loginAgencyWithAdmin: '/agency/login-agency-with-admin',
    verifyKoreanAgency: '/korean-agency/verify-korean-agency',
    getAllPublicAgencies: '/agency/get-all-public',
  },
  koreanAgency: {
    getAll: '/korean-agency/get-all',
    verifyAgency: '/korean-agency/verify-agency',
    loginKoreanAgencyWithAdmin: '/korean-agency/login-korean-agency-with-admin',
  },
  company: {
    getAll: '/company/get-all',
    verifyCompany: '/company/verify-company',
    loginCompanyWithAdmin: '/company/login-company-with-admin',
  },
  mark: {
    getAll: '/mark/get-all',
    getById: '/mark/get-by-id',
    add: '/mark/add',
    update: '/mark/update/',
    delete: '/mark/delete/',
  },
};
