export const environment = {
    production: false,
    api_url_gateway: "http://127.0.0.1:5050/",
    api_url_doctor_service: "api/v1/doctor-service/",
    api_url_emergency_service: "api/v1/emergency-service/",
    api_url_management_service: "api/v1/management-service/",
    token_key: 'hospital_app_jwt_token',
    defaultLanguage: 'en',
    supportedLanguages: [
      'it',
      'en'
    ]
};

export const apiManagementService = environment.api_url_gateway + environment.api_url_management_service;