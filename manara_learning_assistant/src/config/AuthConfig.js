// src/config/authConfig.js

export const msalConfig = {
  auth: {
    // 'Application (client) ID' of your app registration in Azure portal.
    clientId: "CLIENT_ID", 
    
    // The authority is a URL that indicates a directory that MSAL can request tokens from.
    // Replace "YOUR_TENANT_ID_HERE" with your 'Directory (tenant) ID'.
    authority: "https://login.microsoftonline.com/TENANT_ID",
    
    // This is the page where users will be redirected to after login.
    redirectUri: "http://localhost:3000" 
  },
  cache: {
    cacheLocation: "sessionStorage", // This is more secure than localStorage.
    storeAuthStateInCookie: false,
  }
};

// Add scopes here for IdP-initiated flows
export const loginRequest = {
 scopes: ["User.Read"]
};

// Add scopes here for the Microsoft Graph API call
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
