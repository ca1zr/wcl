<template>
    <div class="row">
        <!-- list -->
        <div class="col-xs-12 col-md-8 column column__cards">

            <h1 class="display-4 d-none d-md-block">World Country List</h1>

            <p class="lead d-none d-md-block">
                A full list of all {{ totalCountries() }} countries in the world with their specific details.
            </p>

            <div class="card-deck">
                <div class="card bg-light text-dark mt-3 mb-3" :key="index" v-for="(item, index) in filteredList">

                    <div class="card-header">
                        <div class="d-flex flex-row align-items-center justify-content-left">
                            <div class="pr-1"><inline-svg :src="getFlag(item.alpha2Code)" width="32" height="32" /></div>
                            <div class="pl-1">{{item.nativeName}}</div>
                        </div>

                        <h5 class="card-title mt-2 mb-0">
                            {{item.name}}
                        </h5>
                    </div>

                    <div class="card-body">
                        <ul class="list-unstyled">

                            <li class="card-text" v-if="item.region">
                                <strong>Region:</strong> {{item.region}}
                            </li>

                            <li class="card-text" v-if="item.subregion">
                                <strong>Subregion:</strong> {{item.subregion}}
                            </li>

                            <li class="card-text" v-if="item.capital">
                                <strong>Capital:</strong> {{item.capital}}
                            </li>

                            <li class="card-text" v-if="item.population">
                                <strong>Population:</strong> {{item.population | number('0,0', { thousandsSeparator: '.', decimalSeparator: ',' })}}
                            </li>

                            <li class="card-text" v-if="item.currencies">
                                <strong>Currency/Currencies:</strong>
                                <ul class="list-inline" :key="currencyIndex" v-for="(currency, currencyIndex) in item.currencies">
                                    <li>{{currency.name}} ({{currency.code}})<span v-if="currency.symbol">, {{currency.symbol}}</span></li>
                                </ul>
                            </li>

                            <li class="card-text">
                                <strong>Language(s):</strong>
                                <ul class="list-inline" :key="languageIndex" v-for="(language, languageIndex) in item.languages">
                                    <li>{{language.name}}</li>
                                </ul>
                            </li>

                            <li class="card-text">
                                <strong>Timezone(s):</strong>
                                <ul class="list-inline" :key="timezoneIndex" v-for="(timezone, timezoneIndex) in item.timezones">
                                    <li>{{timezone}}</li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div class="card-footer">
                        <div class="row card-footer-map">
                            <div class="col">

                                <vue-link
                                    :to="`https://www.openstreetmap.org/?mlat=${item.latlng[0]}&mlon=${item.latlng[1]}&zoom=5#map=5/${item.latlng[0]}/${item.latlng[1]}`"
                                    :external="true"
                                    :new-tab="true"
                                    class="btn btn-block btn-outline-secondary"
                                >
                                    <OpenInNewIcon /> Open map
                                </vue-link>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <div class="col-xs-12 col-md-4 column column__settings">
            <div class="column__settings-block">
                <p class="lead mt-2">Filter settings:</p>
                <hr>
                <form @submit.prevent="filterResults">
                    <div class="form-row mb-2">
                        <div class="col">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Search by country…"
                                name="search"
                                v-model="search"
                            >
                        </div>
                    </div>

                    <div class="form-row mb-2">
                        <div class="col">
                            <v-select
                                class="mb-3"
                                placeholder="Select or search a continent"
                                :options="getContinents"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Countries',
        components: {
            // asynchronous components
            VueLink: () => import('vue-link'),
            OpenInNewIcon: () => import('vue-material-design-icons/OpenInNew'),
        },
        data: () => ({
            countries: [],
                search: '',
                continents: [
                'Europe',
                'Asia',
                'Africa',
                'North America',
                'South America',
                'Oceania',
                'Polar',
            ],
                currentItem: {},
        }),
        mounted() {
            const apiURL = 'https://restcountries.eu/rest/v2/all';
            axios.get(apiURL)
                .then((response) => {
                    this.countries = response.data;
                })
                .catch(error => console.log(error));
        },
        methods: {
            getFlag(flagCode) {
                flagCode = flagCode.toLowerCase();
                return `https://lipis.github.io/flag-icon-css/flags/4x3/${flagCode}.svg`;
            },
            totalCountries() {
                return this.countries.length;
            },
            filterResultsByCountryName() {
                return this.countries.filter((country) => {
                    return country.name.toLowerCase().match(this.search.toLowerCase());
                });
            },
        },
        computed: {
            filteredList() {
                return this.filterResultsByCountryName();
            },
            getContinents() {
                return this.continents;
            },
        }
    }
</script>

<style lang="scss">
  @import '~vue-select/src/scss/vue-select';

  .vs {

    &__clear {
      display: flex;
    }

    &__dropdown-toggle {
      background-color: #fff;
    }

    &__dropdown-menu {
      z-index: 2;
    }
  }
</style>

<style lang="scss" scoped>
  @import '~vue-material-design-icons/styles.css';
  @import '~bootstrap/scss/bootstrap-grid';

  .column {
    $this: &;

    &__cards {
      order: 1;
      z-index: 0;

      @include media-breakpoint-up(md) {
        order: 0;
      }
    }

    &__settings {
      order: 0;
      z-index: 1;

      @include media-breakpoint-up(md) {
        order: 1;
      }

      &-block {
        position: sticky;
        top: 10px;
      }
    }
  }

  .card-deck {
    .card {
      @include media-breakpoint-up(sm) {
        flex: 1 0 33%;
        transform: scale(1);
        transition: border-color, box-shadow 0.125s ease;

        &:hover {
          box-shadow: 0 1px 3px darken($border-color, 15%);
          border-color: darken($border-color, 15%);
          transform: scale(1.0015);
          transition: border-color, box-shadow 0.2s ease;
        }
      }
      @include media-breakpoint-up(xl) {
        flex: 1 0 25%;
      }
    }
  }
</style>
