import { ChildProcess } from "child_process";

import { ApplicationStore } from "../store";
import { InstanceData } from "../store/InstanceData";
import { InstanceController } from "../controllers/InstanceController";
import * as InstanceOptionsController from "../InstanceOptionsRender"; // FIXME: should be wrapped in namespace

// import instance modal templates
import renameModalTemplate from "../templates/modals/instances/rename.pug";
import corruptedModalTemplate from "../templates/modals/instances/corrupted.pug";
import savesModalTemplate from "../templates/modals/instances/saves.pug";
import confirmDeleteModalTemplate from "../templates/modals/instances/confirmDelete.pug";
import instanceItemTemplate from "../templates/InstanceItem.pug"; // important item template

import moment from "moment";

export default class InstanceItem extends HTMLDivElement {
	public instanceData: InstanceData;

	public constructor(data?: InstanceData) {
		super();
		this.instanceData = data as any;
	}

	public render(): void {
		this.innerHTML = instanceItemTemplate({ data: { ...this.instanceData, lastPlayedStr: this.lastPlayedStr } }); // render template
		// show data in instance info segment
		this.addEventListener("click", () => {
			(document.getElementById("modal-info") as any).render(this);
		});

		this.addEventListener("mouseenter", () => {
			$(this.getElementsByClassName("btn-instance-actions")[0]).stop().fadeIn({
				duration: 70,
				queue: false
			});
		});
		this.addEventListener("mouseleave", () => {
			$(this.getElementsByClassName("btn-instance-actions")[0]).stop().fadeOut({
				duration: 70,
				queue: false
			});
		});
	}

	/**
	 * Shows a rename modal and handles user input
	 */
	public rename(): void {
		const renameModal = document.getElementById("modal-rename");
		if (renameModal !== null) {
			renameModal.outerHTML = renameModalTemplate({ name: this.instanceData.name });
			$("#modal-rename").modal({
				closable: false,
				onApprove: () => {
					const find = ApplicationStore.instances.findFromName($("#input-rename").val() as string); // make sure an instance with this name does not already exist
					if (find !== undefined) {
						alert("An instance with this name already exists"); // TODO: Change to modal to match rest of UI
						return false;
					}
					else
						InstanceController.renameInstance(this.instanceData.name, $("#input-rename").val() as string); // TODO: move all InstanceController logic to InstanceStore
				}
			}).modal("show");
		}
	}

	/**
	 * Shows a confirm delete modal and asks if user wishes to delete instance folder
	 */
	public delete(): void {
		const deleteModal = document.getElementById("modal-confirmDelete");
		if (deleteModal !== null) {
			deleteModal.outerHTML = confirmDeleteModalTemplate({ name: this.instanceData.name });
			$("#modal-confirmDelete").modal({
				closable: false,
				onApprove: () => {
					// delete instance
					const deleteFolder: boolean = $("#modal-confirmDelete input[name='deleteFolder']").is(":checked");
					InstanceController.deleteInstance(this.instanceData.name, deleteFolder);
				}
			}).modal("show");
		}
	}

	/**
	 * Show saves modal for an instance
	 */
	public saves(): void {
		const savesModal = document.getElementById("modal-saves");
		if (savesModal !== null) {
			savesModal.outerHTML = savesModalTemplate({ name: this.instanceData.name });
			$("#modal-saves").modal({
				closable: false
			}).modal("show");
		}
	}

	public options(): void {
		InstanceOptionsController.showOptionsForInstance(this.instanceData.name);
	}

	/**
	 * Shows a modal that display a warning to the user that the current instance is corrupted
	 */
	public alertCorrupted(): void {
		const corruptedModal = document.getElementById("modal-corrupted");
		if (corruptedModal !== null) {
			corruptedModal.outerHTML = corruptedModalTemplate({ name: this.instanceData.name });
			$("#modal-corrupted").modal({
				closable: false,
				onApprove: () => {
					this.install(true);
				}
			}).modal("show");
		}
	}

	/**
	 * Installs the instance
	 */
	public async install(renderOnFinish: boolean = false): Promise<void> {
		const btn = (this.getElementsByClassName("btn-play-install")[0] as HTMLButtonElement);
		btn.classList.remove("olive", "green");
		btn.classList.add("gray", "disabled");
		btn.id = "";
		btn.textContent = "Installing...";
		await InstanceController.installByName(this.instanceData.name);
		if (renderOnFinish) this.render(); // installation finished, render again
	}

	public async play(): Promise<ChildProcess | null> {
		// FIXME: move logic here
		// launch by name
		const instance = ApplicationStore.instances.findFromName(this.instanceData.name);
		if (instance !== undefined) {
			try {
				const res = await instance.launch();
				// last played should be updated, save to store
				await ApplicationStore.instances.setInstance(this.instanceData.name, instance);
				return res;
			}
			catch (err) {
				if (err.type === "MissingLibs") {
					// show corrupted modal
					this.alertCorrupted();
					return null;
				}
				else throw err; // pipe error
			}
		}
		else throw Error("The instance requested does not exist");
	}

	/**
	 * Display info about instance in instance info segment
	 */
	public showInstanceInfo() {

	}

	/**
	 * Get time since last played
	 */
	public get lastPlayedStr(): string {
		return this.instanceData.lastPlayed === "never" ? "never" :
			moment(this.instanceData.lastPlayed).fromNow();
	}
}

customElements.define("instance-item", InstanceItem, { extends: "div" });
