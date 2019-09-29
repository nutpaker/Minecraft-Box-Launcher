import { Auth } from '@xmcl/minecraft-launcher-core';

import * as store from './store';

/**
 * Sends a request Yggdrasil auth server and stores the returned data
 * @param username Minecraft email
 * @param password Minecraft password
 */
export async function login(username: string, password: string): Promise<Auth> {
    const authFromMojang: Auth = await Auth.Yggdrasil.login({ username, password }); // official login
    // save data to electron store
    store.auth.set(authFromMojang);
    store.auth.set("loggedIn", true);
    return authFromMojang;
}

/**
 * Shows modal that appears over page
 */
export function showLoginModal() {
    $("#login-modal").modal({
        onDeny: () => {
            // show are you sure message
        }
    }).modal('show');
}

/**
 * Updates the login status in the navigation
 */
export function updateLoginStatus() {
    if (store.auth.get("loggedIn", false) == false) {
        $("#login-status").html("Log in");
        $("#login-status").attr("onclick", "auth.showLoginModal()");
    }
    else {
        // show user profile name
        $("#login-status").html(store.auth.get("profiles")[0].name);
        $("#login-status").attr("onclick", "");
    }
}