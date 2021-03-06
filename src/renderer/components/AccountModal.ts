import { customElement, html, LitElement, property, TemplateResult } from "lit-element";
import AuthStore, { AuthStoreData } from "../store/AuthStore";
import type { AuthModal } from "./AuthModal";

@customElement("modal-account")
export default class AccountModal extends LitElement {
	protected createRenderRoot(): this { return this; }

	@property({ type: Object }) public authData: AuthStoreData | { loggedIn: false } = AuthStore.store;

	protected render(): TemplateResult {
		return html`
			<div class="header">Account</div>
			<div class="content">
				<div class="ui large list">
					<div class="item">
						${this.authData.loggedIn ? html`
							<img class="ui avatar image" src="https://minotar.net/avatar/${this.authData.selectedProfile.id}" alt="skin head">
							<div class="content">
								<div class="header" style="display: inline-block;">${this.authData.selectedProfile.name}</div>
								<div class="description">(UUID: <span style="user-select: all;">${this.authData.selectedProfile.id}</span></div>
							</div>
							<div class="right floated content">
								<button class="ui right floated red button" onclick="AuthenticationController.logout()">
									<i class="fas fa-sign-out-alt"></i> Logout
								</button>
							</div>
						`: html`
						<div class="content" style="display: inline-block;">
							<div class="header">You have not logged in to your Minecraft account yet.</div>
							<div class="description">Log in now to start playing and to unlock all the goodies!</div>
						</div>
						<div class="right floated content"><button class="ui primary button" @click="${this.showLoginModal}">Login</button></div>
						`}
					</div>
				</div>
			</div>
		`;
	}

	private async showLoginModal(): Promise<void> {
		await import("./AuthModal");
		document.querySelector<AuthModal>("#modal-login")!.showModal();
	}

	public showModal(): void {
		$(this).modal("show");
	}
}

$(() => {
	document.getElementById("account-modal-link")?.addEventListener("click", () => {
		document.querySelector<AccountModal>("modal-account")!.showModal();
	});
});

const changeCallback = (): void => {
	console.log("Auth store changed, rendering account modal");
	const target = document.querySelector<AccountModal>("modal-account")!;
	target.authData = AuthStore.store;
	target.requestUpdate();
};
// @ts-ignore
AuthStore.onDidChange("selectedProfile.name", changeCallback);
AuthStore.onDidChange("loggedIn", changeCallback);
