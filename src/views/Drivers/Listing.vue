<template>
  <div class="d-flex">
    <h3 class="mb-4">{{ $t("Driver") }} |</h3>
    <Breadcrumb :breadcrumbList="breadcrumbList" />
  </div>

  <BaseCard>
    <div class="d-lg-flex align-items-center mb-4 gap-3">
      <div class="position-relative">
        <input
          type="text"
          class="form-control ps-5 radius-30"
          :placeholder="$t('Search Driver')"
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
            <li @click="handleDeleteMultipleDrivers">
              <a class="dropdown-item" href="#">{{ $t("Delete") }}</a>
            </li>
          </ul>
        </div>
        <a
          @click="$router.push('/create-driver')"
          class="btn btn-primary mt-2 mt-lg-0 px-3 mx-2"
          ><i class="bx bxs-plus-square"></i>{{ $t("Add Driver") }}</a
        >
      </div>
    </div>
    <base-table
      :header="headers"
      :items="drivers"
      :isLoading="loading"
      @sort="onSort"
      :checkable="true"
      @onSelected="onSelected"
    >
      <template #firstname="{ item }">
        <td>{{ item.firstname }} {{ item.lastname }}</td>
      </template>
      <template #status="{ item }">
        <td>
          <span
            class="badge"
            v-bind:class="{
              'bg-success': item.status === 'available',
              'bg-danger': item.status === 'busy',
            }"
          >
            {{ $t(item.status.toUpperCase()) }}
          </span>
        </td>
      </template>

      <template #action="{ item }">
        <td>
          <div class="d-flex justify-content-center">
            <base-link-icon
              color="list-icon"
              icon="fadeIn animated lni lni-eye"
              @click="
                $router.push({
                  name: 'list-order-by-driver',
                  params: { id: item.id },
                })
              "
            />
            <base-link-icon
              color="list-icon"
              icon="fadeIn animated bx bx-edit"
              @click="
                $router.push({
                  name: 'edit-driver',
                  params: { id: item.id },
                })
              "
            />
            <base-link-icon
              color="text-danger list-icon"
              icon="bx bx-trash-alt"
              @click="singleRemoveDriver(item.id)"
            />
          </div>
        </td>
      </template>
    </base-table>
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
  name: "ListingDriver",
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
import { remove, getList, multipleDeleteDrivers } from "@/api/driver";
import { ref, onMounted, computed } from "vue";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";
const notyf = useNotyf();
const isDeleteLoading = ref(false);
const loading = ref(false);
const drivers = ref([]);
const selected = ref([]);
const search = ref([]);
const { t } = useI18n({});
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
      title: t("Phone"),
      key: "phone_number",
    },
    {
      title: t("Status"),
      key: "status",
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
      title: t("Drivers"),
      routeName: "list-driver",
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
    drivers.value = res.data;
    meta.value = res.meta;
    loading.value = false;
    isDeleteLoading.value = false;
  } catch (error) {
    loading.value = false;
  }
};

onMounted(getData());

const singleRemoveDriver = (id) => {
  Swal.fire({
    title: t("Do you want to remove?"),
    showDenyButton: true,
    confirmButtonText: t("Remove"),
    denyButtonText: t("No"),
    confirmButtonColor: "red",
    denyButtonColor: "grey",
  }).then(async (result) => {
    if (result.isConfirmed) {
      isDeleteLoading.value = true;
      try {
        await remove(id);
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

const handleDeleteMultipleDrivers = () => {
  if (selected.value.length < 1) {
    return;
  }
  Swal.fire({
    title: t("Do you want to remove?"),
    showDenyButton: true,
    confirmButtonText: t("Remove"),
    confirmButtonColor: "red",
    denyButtonColor: "grey",
  }).then(async (result) => {
    if (result.isConfirmed) {
      isDeleteLoading.value = true;
      try {
        await multipleDeleteDrivers(selected.value);
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

<style>
.btn:focus {
  box-shadow: none !important;
}
.dropdown-toggle-split {
  border-left: 1px solid white;
}
</style>