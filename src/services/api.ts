const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = () => localStorage.getItem('token');

// Helper function for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const token = getToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'API request failed');
    }

    return response.json();
};

// Auth API
export const authAPI = {
    login: async (email: string, password: string) => {
        const data = await apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        localStorage.setItem('token', data.token);
        return data;
    },

    register: async (userData: any) => {
        const data = await apiCall('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        localStorage.setItem('token', data.token);
        return data;
    },

    getMe: async () => {
        return apiCall('/auth/me');
    },

    logout: () => {
        localStorage.removeItem('token');
    },
};

// Admin API
export const adminAPI = {
    getDashboardStats: async () => {
        return apiCall('/admin/dashboard/stats');
    },

    getCamps: async () => {
        return apiCall('/admin/camps');
    },

    createCamp: async (campData: any) => {
        return apiCall('/admin/camps', {
            method: 'POST',
            body: JSON.stringify(campData),
        });
    },

    getInventory: async () => {
        return apiCall('/admin/resources/inventory');
    },

    getAnalytics: async () => {
        return apiCall('/admin/reports/analytics');
    },

    getVictims: async () => {
        return apiCall('/admin/victims');
    },
};

// Manager API
export const managerAPI = {
    getCampDetails: async (campId: number) => {
        return apiCall(`/manager/camp/${campId}`);
    },

    getCampVictims: async (campId: number) => {
        return apiCall(`/manager/camp/${campId}/victims`);
    },

    registerVictim: async (victimData: any) => {
        return apiCall('/manager/victims', {
            method: 'POST',
            body: JSON.stringify(victimData),
        });
    },

    updateResources: async (campId: number, resources: any[]) => {
        return apiCall(`/manager/camp/${campId}/resources`, {
            method: 'PUT',
            body: JSON.stringify({ resources }),
        });
    },

    createRequest: async (requestData: any) => {
        return apiCall('/manager/requests', {
            method: 'POST',
            body: JSON.stringify(requestData),
        });
    },

    getRequests: async () => {
        return apiCall('/manager/requests');
    },
};

// Volunteer API
export const volunteerAPI = {
    getTasks: async () => {
        return apiCall('/volunteer/tasks');
    },

    updateTask: async (taskId: number, status: string) => {
        return apiCall(`/volunteer/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        });
    },

    getSchedule: async () => {
        return apiCall('/volunteer/schedule');
    },
};

// Victim API
export const victimAPI = {
    getStatus: async (victimId: number) => {
        return apiCall(`/victim/status/${victimId}`);
    },

    submitAidRequest: async (requestData: any) => {
        return apiCall('/victim/aid-request', {
            method: 'POST',
            body: JSON.stringify(requestData),
        });
    },

    getNearbyCamps: async () => {
        return apiCall('/victim/camps/nearby');
    },
};

// Public API
export const publicAPI = {
    getCamps: async () => {
        return apiCall('/public/camps');
    },

    searchVictims: async (query: string) => {
        return apiCall(`/public/search/victims?query=${encodeURIComponent(query)}`);
    },

    searchCamps: async (location: string) => {
        return apiCall(`/public/search/camps?location=${encodeURIComponent(location)}`);
    },
};
