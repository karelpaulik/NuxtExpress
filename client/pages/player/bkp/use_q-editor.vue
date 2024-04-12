<template>
    <div>
        <q-editor v-model="dataSpecPlayer.richText" 
          :definitions="{
            upload: {
              tip: 'Upload',
              icon: 'cloud_upload',
              label: 'Upload',
              handler: update
            }
          }"
          :toolbar="[
            ['bold', 'italic', 'strike', 'underline'],
            ['undo', 'redo'],
            ['upload'],
            ['viewsource']
          ]"
        />
    </div>
</template>
