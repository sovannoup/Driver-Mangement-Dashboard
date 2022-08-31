<template>
  <!--start header -->
  <header>
    <div class="topbar d-flex align-items-center">
      <nav class="navbar navbar-expand" style="justify-content: space-between">
        <div class="mobile-toggle-menu" v-responsive-menu>
          <i class="bx bx-menu"></i>
        </div>
        <div
          v-if="back"
          @click="$router.push({ name: back })"
          class="d-flex align-items-center cursor-pointer"
        >
          <div>
            <i class="bx bx-chevron-left me-1 font-22 text-gray"></i>
          </div>
          <h6 class="mb-0 text-gray">{{ $t("Back") }}</h6>
        </div>
        <div v-else>
          <!-- <h4 class="mb-0">{{ Message }}</h4>
          <span
            class="font-12 mt-2 text-warning"
            v-if="undercontruction !== 'production'"
          >
            {{ undercontruction }} mode</span
          > -->
        </div>
        <div class="d-flex">
          <div class="user-box dropdown" v-userbox-dropdown style="width: 150px">
            <a
              class="
                d-flex
                align-items-center
                nav-link
                dropdown-toggle dropdown-toggle-nocaret
              "
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            >
              <a class="btn ms-1">
                <!-- <i class="fadeIn animated bx bx-world"></i>
                <span class="">{{ $t('Language') }}</span> -->
                <img :src="currentLanguage() === 'English' ? require('@/assets/flags/1x1/us.svg') : require('@/assets/flags/1x1/kh.svg')" style="width: 20px; height: 15px" />
                <span class="mx-3">{{ $t(currentLanguage()) }}</span>
              </a>
            </a>
            <!-- toggle show classs here -->
            <ul class="dropdown-menu dropdown-menu-end">
              <li @click="changeLanguage('en')">
                <a class="dropdown-item" href="javascript:;"
                  ><img src="@/assets/flags/1x1/us.svg" style="width: 20px; height: 15px" /><span class="mx-3">{{ $t('English') }}</span></a
                >
              </li>
              <li>
                <div class="dropdown-divider "></div>
              </li>
              <li @click="changeLanguage('km')">
                <a class="dropdown-item" href="javascript:;"
                  ><img src="@/assets/flags/1x1/kh.svg" style="width: 20px; height: 15px" /><span class="mx-3">{{ $t('Khmer') }}</span></a
                >
              </li>
            </ul>
          </div>

          <div class="user-box dropdown ms-0" v-userbox-dropdown>
            <!-- toggle show classs here -->
            <a
              class="
                d-flex
                align-items-center
                nav-link
                dropdown-toggle dropdown-toggle-nocaret
              "
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                :src="profile?.image || image"
                class="user-img"
                alt="user avatar"
              />
              <div class="user-info ps-3">
                <p class="user-name mb-0 text-capitalize">
                  {{
                    profile?.firstname || profile?.lastname
                      ? profile.firstname + " " + profile.lastname
                      : "N/A"
                  }}
                </p>
                <p class="designattion mb-0 text-capitalize">
                  {{
                    profile?.type === "admin" ? $t("Super Admin") : $t("Admin")
                  }}
                </p>
              </div>
              <Spinner v-if="isUserProfileLoading | isLogoutLoading" />
            </a>
            <!-- toggle show classs here -->
            <ul class="dropdown-menu dropdown-menu-end">
              <li @click="handleChangeRoute('profile')">
                <a class="dropdown-item" href="javascript:;"
                  ><i class="bx bx-user"></i><span>{{ $t('Profile') }}</span></a
                >
              </li>
              <li @click="handleChangeRoute('change-password')">
                <a class="dropdown-item" href="javascript:;"
                  ><i class="bx bx-cog"></i><span>{{ $t('Change Password') }}</span></a
                >
              </li>
              <li>
                <div class="dropdown-divider mb-0"></div>
              </li>
              <li @click="logout">
                <a class="dropdown-item" href="javascript:;"
                  ><i class="bx bx-log-out-circle"></i><span>{{ $t('Logout') }}</span></a
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { computed,  onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import image from "../../assets/images/no-image.png";
import moment from "moment";
import { useI18n } from "vue-i18n";


export default {
  name: "Header",
  props: {
    isLogoutLoading: Boolean,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const { t } = useI18n({}) 
    const store = useStore();
    const logout = () => {
      emit("logout");
    };

    const handleChangeRoute = (route) => {
      router.push("/" + route);
    };
    const Message = computed(() => {
      var now = moment();
      var hours = now.hour();
      var message =
        hours < 12
          ? "Good Morning"
          : hours < 18
          ? "Good Afternoon"
          : "Good Evening";
      return message;
    });

    const undercontruction = computed(() => {
      return process.env.NODE_ENV;
    });

    const changeLanguage = (val) =>{
      store.dispatch('i18n/setLocal',val);
    }

    const currentLanguage = () => {
        return store.getters['i18n/local'] === 'en' ? 'English' : 'Khmer'
    }

    return {
      undercontruction,
      Message,
      logout,
      changeLanguage,
      profile: computed(() => store.getters["profile/user"]),
      isUserProfileLoading: computed(
        () => store.getters["profile/isUserProfileLoading"]
      ),
      handleChangeRoute,
      back: computed(() => store.state.layout.back),
      image,
      currentLanguage
    };
  },
};
</script>