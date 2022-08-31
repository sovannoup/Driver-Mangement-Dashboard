<template>
  <div class="d-flex">
    <h3 class="mb-4">{{ $t("User") }} |</h3>
    <Breadcrumb :breadcrumbList="breadcrumbList" />
  </div>
  <BaseCard>
    <div class="d-lg-flex align-items-center mb-4 gap-3">
      <div class="position-relative">
        <input
          type="text"
          class="form-control ps-5 radius-30"
          :placeholder="$t('Search User')"
          v-model="query.search"
          @keyup.enter="getData"
          @input="searchInput"
        />
        <span class="position-absolute top-50 product-show translate-middle-y"
          ><i class="bx bx-search"></i
        ></span>
      </div>

      <div class="d-flex ms-auto">
        <div class="btn-group" v-if="selected.length > 0">
          <button type="button" class="btn btn-primary">Bulk Action</button>
          <button
            type="button"
            class="btn btn-primary dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span class="visually-hidden">Bulk Action</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li @click="handleDeleteMultipleUsers">
              <a class="dropdown-item" href="#">{{ $t("Delete") }}</a>
            </li>
          </ul>
        </div>
        <a
          @click="$router.push('/create-user')"
          class="btn btn-primary mt-2 mt-lg-0 px-3 mx-2"
          ><i class="bx bxs-plus-square"></i>{{ $t("Add User") }}</a
        >
      </div>
    </div>
    <div class="table-responsive">
      <base-table
        :isLoading="loading || isDeleteLoading"
        :items="users"
        :header="headers"
        @sort="onSort"
        :checkable="true"
        @onSelected="onSelected"
      >
        <template #firstname="{ item }">
          <td>
            <BaseImage :src="item.image" class="user-img"></BaseImage>
            {{ item.title }} {{ item.firstname }} {{ item.lastname }}
          </td>
        </template>
        <template #status="{ item }">
          <td>
            <div
              class="badge rounded-pill p-2 text-uppercase px-3"
              :class="[
                item.status === 'enabled'
                  ? 'text-success bg-light-success'
                  : 'text-danger bg-light-danger',
              ]"
            >
              <i class="bx bxs-circle me-1"></i>{{ $t(item.status) }}
            </div>
          </td>
        </template>

        <template #action="{ item }">
          <td>
            <div class="d-flex order-actions justify-content-center">
              <base-link-icon
                color="list-icon"
                icon="fadeIn animated bx bxs-edit"
                @click="
                  $router.push({
                    name: 'edit-user',
                    params: { id: item.id },
                  })
                "
              />
              <base-link-icon
                color="list-icon"
                icon="fadeIn animated bx bxs-trash"
                @click="removeUser(item.id)"
              />
            </div>
          </td>
        </template>
      </base-table>
    </div>
    <!-- <base-paginate
      @onChangeAmountToShow="onChangeAmountToShow"
      @onChange="getData"
      :pages="meta.last_page"
      v-model="query.page"
    /> -->
  </BaseCard>
</template>

<script>
import BasePaginate from "../../components/BasePaginate.vue";
export default {
  name: "ListingUser",
  layout: "admin",
  middleware: ["auth"],
  components: {
    BasePaginate,
  },
};
</script>

<script setup>
import { debounce } from "lodash";
import useNotyf from "../../composable/useNotyf";
import { getList, singleDeleteUsers, multipleDeleteUsers } from "@/api/users";
import { ref, onMounted, computed } from "vue";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";
import Button from "../../components/Button.vue";

const { t } = useI18n({});
const notyf = useNotyf();
const isDeleteLoading = ref(false);
const loading = ref(false);
const users = ref([]);
const selected = ref([]);
const meta = ref({
  total: 0,
});
const query = ref({
  page: 1,
  sort: null,
  direction: null,
  limit: 8,
  search: null,
});
const headers = computed(() => {
  return [
    {
      title: "#",
      key: "id",
      sortable: true,
    },
    {
      title: t("Name"),
      key: "firstname",
      sortable: true,
    },
    {
      title: t("Email"),
      key: "email",
      sortable: true,
    },
    {
      title: t("Status"),
      key: "status",
      sortable: false,
    },
    {
      title: t("Action"),
      key: "action",
      sortable: false,
      alignment: "text-center",
    },
  ];
});

const breadcrumbList = computed(() => {
  return [
    {
      title: t("Dashboard"),
      routeName: "dashboard-index",
      isActive: true,
    },
    {
      title: t("Users"),
      routeName: "list-user",
      isActive: true,
    },
  ];
});

const onSort = ({ sort, direction }) => {
  if (sort) query.value.sort = sort;
  if (direction) query.value.direction = direction;
  getData();
};

const searchInput = debounce(() => {
  if (query.value.search.length >= 3 || query.value.search.length === 0) {
    getData();
  }
}, 500);

const getData = async () => {
  try {
    loading.value = true;
    const res = await getList(query.value);
    users.value = res.data;
    meta.value = res.meta;
    loading.value = false;
    isDeleteLoading.value = false;
  } catch (error) {
    loading.value = false;
  }
};

onMounted(getData());

const removeUser = (id) => {
  Swal.fire({
    title: t("Do you want to remove?"),
    showDenyButton: true,
    confirmButtonText: t("Remove"),
    confirmButtonColor: "red",
    denyButtonColor: "grey",
    denyButtonText: t("No"),
  }).then(async (result) => {
    if (result.isConfirmed) {
      isDeleteLoading.value = true;
      try {
        await singleDeleteUsers(id);
        isDeleteLoading.value = false;
        notyf.success(t("Deleted successfully!"));
        getData();
      } catch (error) {
        notyf.error(t("Something went wrong, please try agian later!"));
        isDeleteLoading.value = false;
      }
    }
  });
};

const onChangeAmountToShow = (amount) => {
  query.value.limit = amount;
};

const onSelected = (ids) => {
  selected.value = ids.value;
};

const handleDeleteMultipleUsers = () => {
  if (selected.value.length < 1) {
    return;
  }
  Swal.fire({
    title: t("Do you want to remove?"),
    showDenyButton: true,
    confirmButtonText: t("Remove"),
    confirmButtonColor: "red",
    denyButtonColor: "grey",
    denyButtonText: t("No"),
  }).then(async (result) => {
    if (result.isConfirmed) {
      isDeleteLoading.value = true;
      try {
        await multipleDeleteUsers(selected.value);
        notyf.success(t("Deleted successfully!"));
        selected.value = [];
        getData();
      } catch (error) {
        notyf.error(t("Something went wrong, please try again later!"));
        isDeleteLoading.value = false;
      }
    }
  });
};
</script>

<style scoped>
.btn:focus {
  box-shadow: none !important;
}
.dropdown-toggle-split {
  border-left: 1px solid white;
}
</style>