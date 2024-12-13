<template>
	<li class="wish-list__item flex flex-col justify-start align-left my-4">
		<div class="wish-list__input-btns-wrapper flex justify-start align-center">

			<div class="wish-list__dragndrop">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
					<path fill-rule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
				</svg>
			</div>

			<input
				type="text"
				ref="wishListItem"
				v-model="currentValue"
				@keydown.enter="saveEdit"
				@keydown.esc="cancelEdit"
				@click.prevent="startEdit"
				@blur="cancelEdit"
				class="wish-list__text flex-1 mr-4 focus:border-b-blue-400"/>

			<button class="wish-list__edit--start" @click.prevent="startEdit" v-if="!isEditMode">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
					<path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
				</svg>
			</button>

			<button class="wish-list__edit--save" @click.prevent.stop="saveEdit" @mousedown="()=> saveClicked=true" v-if="isEditMode">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" class="size-6">
					<path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
				</svg>
			</button>

			<button class="wish-list__edit--cancel" @click.prevent.stop="cancelEdit" v-if="isEditMode">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="size-6">
					<path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
				</svg>
			</button>

			<button class="wish-list__remove" @click.prevent="$emit('remove')">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
					<path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
				</svg>
			</button>

			<div class="wish-list__add-image-wrapper">
			<input
				type="file"
				@change="handleImageUpload"
				:id="'add-image-' + wish.id"
				class="wish-list__image--add hidden"
				accept=".jpg, .jpeg, .png"
			/>

			<label 	:for="'add-image-' + wish.id"
							class="wish-list__add-image-label cursor-pointer">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
					<path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
				</svg>
			</label>

		</div>
		</div>
		<div v-if="image" class="wish-list__image-wrapper mt-2 relative max-w-[200px] max-h-[200px]">
      	<img 	:src="image"
							alt="Uploaded Image"
							class="wish-list__image object-cover max-w-full max-h-full rounded" />
				<button class="wish-list__image--delete absolute top-1 right-1 bg-slate-50/50 p-0.5 rounded"
								@click.prevent="removeImage">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="size-6">
						<path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
					</svg>
				</button>
    </div>
	</li>
</template>

<script>
export default {
	data() {
		return {
			isEditMode: false,
			currentValue: this.wish.name,
			valueBeforeEdit: '',
			image: this.wish.image,
			saveClicked: false
		}
	},

	props: {
		wish: {
			type: Object,
			required: true
		}
	},

	methods: {
		startEdit() {
			console.log('Start the edit');
			this.isEditMode = true;
			this.valueBeforeEdit = this.currentValue;
			this.$nextTick(() => {
        this.$refs.wishListItem.focus();
      });
		},
		saveEdit() {
			this.isEditMode = false;
			this.saveClicked = false;
			this.updateWish();
		},
		cancelEdit(){
			if(!this.saveClicked) {
				this.currentValue = this.valueBeforeEdit;
				this.isEditMode = false;
			}
		},

		handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.image = reader.result;
          this.updateWish();
        };
        reader.readAsDataURL(file); // Read the file as base64
      }
    },

		removeImage(){
			this.image = null;
			this.updateWish();
		},

		updateWish() {
			this.$emit('edit',{id: this.wish.id, newValue: this.currentValue, imageUrl: this.image});
		}
	},
};
</script>

<style scoped lang="less">
</style>