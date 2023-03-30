<template>
  <v-card flat v-if="item">
    <v-card-title>
      <v-row>
        <v-col cols="10">
          <v-btn
            color="black"
            outlined
            :to="{ name: 'home' }"
          >
            {{ $t('toList') }}
          </v-btn>
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
    <v-list>
        <v-list-item
          v-for="key in listField"
          :key="key"
        >
          <h3>
            <b>{{ $t(`tabelHeader-${key}`) }}:</b>
            {{ key === 'user' ? userData : item[key] }}
          </h3>
        </v-list-item>
      </v-list>
  </v-card>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class Fact extends Vue {
    public loadItem(): void {
      this.$store.dispatch('fetchFact', this.$route.params.id);
    }
    protected created(): void {
      if (this.$route.params.id) {
        this.loadItem();
      }
    }
    public get item(): FACTS.Fact {
      return this.$store.getters.getItem;
    }
    public get listField(): Array<keyof FACTS.Fact> {
      return Object.keys(this.$store.getters.getShowTabelHeaders) as Array<keyof FACTS.Fact>;
    }
    public get userData(): string {
      const user = this.item.user as FACTS.FactUser;
      return `${user.name.first} ${user.name.last}: ${user._id}`;
    }
  }
</script>
