<template>
  <v-dialog
    v-model="dialog"
    width="300"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        color="black"
        outlined
        v-bind="props"
        @click="dialog = true"
      >
        {{ $t('setColumn') }}
      </v-btn>
    </template>

    <v-card>
      <v-list>
        <v-list-item
          v-for="(val, key) in showTabelHeaders"
          :key="key"
        >
          <v-checkbox
            :input-value="val"
            :label="$t(`tabelHeader-${key}`)"
            @change="changeShowTabelHeaders($event, key)"
          />
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-btn
          color="black"
          outlined
          block
          @click="dialog = false"
        >
          {{ $t('close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class DialogShowTabelHeaders extends Vue {
    public dialog: boolean = false;
    public get showTabelHeaders(): { [key: string]: boolean; } {
      return this.$store.getters.getShowTabelHeaders;
    }
    public changeShowTabelHeaders(val: boolean, key: string): void {
      this.$store.commit('updShowTabelHeaders', { val, key })
    }
  }
</script>