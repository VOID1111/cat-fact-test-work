<template>
  <v-card flat>
    <v-card-title>
      <v-row>
        <v-col cols="6">
          <h3>{{ $t('pageTitle')  }}</h3>
        </v-col>
        <v-col cols="2">
          <DialogShowTabelHeaders />
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="itemsPerPage"
            :items="perPageChoices"
            :label="$t('itemsPerPage')"
            @change="loadItems()"
          />
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="$i18n.locale"
            :items="$i18n.availableLocales"
            :label="$t('language')"
          >
            <template v-slot:selection="{ item }">
              {{ $t(item) }}
            </template>
            <template v-slot:item="{ item }">
              {{ $t(item) }}
            </template>
          </v-select>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table
        :headers="tabelHeaders"
        :items="items"
        :items-per-page="itemsPerPage"
        hide-default-footer
        hide-default-header
        @click:row="openItem"
    >
      <template v-slot:header="{ props }">
        <th
          v-for="head in props.headers"
          :key="head.value"
          align="left"
          class="pl-4"
        >
          {{ $t(head.text) }}
        </th>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import DialogShowTabelHeaders from "@/components/DialogShowTabelHeaders.vue";

  @Component({
    components: {
      DialogShowTabelHeaders
    }
  })
  export default class Home extends Vue {
    public get perPageChoices(): BASE.PerPageChoices {
      return [
        { text: this.$t('fiveItemsOnPage'), value: 5 },
        { text: this.$t('tenItemsOnPage'), value: 10 },
        { text: this.$t('fifteenItemsOnPage') , value: 15 }
      ]
    }
    public itemsPerPage: number = 10;
    public loadItems(): void {
      this.$store.dispatch('fetchFacts', this.itemsPerPage);
    }
    protected created(): void {
      if (!this.items || this.items.length === 0) {
        this.loadItems();
      }
    }
    public get items(): FACTS.Facts {
      return this.$store.getters.getItems;
    }
    public get tabelHeaders(): BASE.TabelHeaders {
      return this.$store.getters.getTabelHeaders;
    }
    public openItem(val: FACTS.Fact): void {
      this.$router.push({ name: 'fact', params: { id: val._id } })
    }
  }
</script>
