<template>
  <div>
    <div class="text-end mb-3 d-flex justify-content-end">
      <Popper text="Add">
        <router-link :to="{ name: addPathName }">
          <Button type="button" variant="btn-primary" :isSmall="false">
            <i
              class="bx bx-plus-circle"
              style="margin: 0; padding: 0; margin-left: 5px"
            ></i>
          </Button>
        </router-link>
      </Popper>

      <Popper text="Multiple Delete">
        <Button
          @click="handleMultipleDeleteManufactures"
          type="button"
          variant="btn-danger"
          :isSmall="false"
          class="ms-2"
          v-if="typeof multiDelete === 'function'"
        >
          <i
            class="bx bx-trash"
            style="margin: 0; padding: 0; margin-left: 5px"
          ></i>
        </Button>
      </Popper>
    </div>

    <div v-if="!isDataLoading" class="table-responsive">
      <table class="table">
        <thead class="table-light">
          <tr>
            <th scope="col" v-if="typeof multiDelete === 'function'">
              <input
                @change="selectAllCheckboxes"
                class="form-check-input"
                type="checkbox"
                id="remove-checkbox-parent"
                ref="removeCheckboxParent"
              />
            </th>

            <th
              v-for="item in headers"
              :class="{ sortable: item.sortable }"
              scope="col"
              :key="item.id"
              @click="item.sortable && handleSort(item.propertyNameOnAPI)"
            >
              <p>
                {{ item.title }}
                <span v-if="item.sortable">
                  <span v-if="sort.sortBy === item.propertyNameOnAPI">
                    <span v-if="sort.sortDirection === 'asc'">
                      <i class="bx bx-down-arrow-alt" />
                    </span>
                    <span v-else>
                      <i class="bx bx-up-arrow-alt" />
                    </span>
                  </span>

                  <span v-else>
                    <i class="bx bxs-sort-alt" />
                  </span>
                </span>
              </p>
            </th>

            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data?.data" :key="index">
            <td v-if="typeof multiDelete === 'function'">
              <input
                class="form-check-input"
                type="checkbox"
                name="remove"
                :value="item.id"
                :key="item.id"
              />
            </td>

            <td v-for="(header, index) in headers" :key="index">
              <span v-if="header.propertyNameOnAPI !== 'status'">
                {{ item[header.propertyNameOnAPI] }}
              </span>

              <span v-else>
                <span v-if="item[header.propertyNameOnAPI] === true">
                  <i
                    class="bx bx-check"
                    style="font-size: 20px; color: green"
                  ></i>
                </span>

                <span v-else>
                  <i
                    class="bx bx-x-circle"
                    style="font-size: 20px; color: red"
                  ></i>
                </span>
              </span>
            </td>

            <td>
              <div class="d-flex actions">
                <Popper text="Update this item" style="margin-right: 1px">
                  <a href="javascript:;" @click="handleEdit(item.id)"
                    ><i class="bx bxs-edit"></i
                  ></a>
                </Popper>

                <Popper text="Delete this item">
                  <a href="javascript:;" @click="handleDelete(item.id)"
                    ><i class="bx bxs-trash"></i
                  ></a>
                </Popper>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <div v-else>
      <div style="margin-bottom: 10px">
        <Skeletor height="50" width="100%" />
      </div>
      <Skeletor height="300" />
    </div> -->

<!-- 
    <nav v-if="pagination && pagination > 1">
      <ul class="pagination justify-content-center">
        <li
          :class="'page-item ' + `${currentPage == item && 'active'}`"
          v-for="item in pagination"
          :key="item"
          @click="handlePageChange(item)"
        >
          <a class="page-link" href="javascript:;javascript:;">{{ item }}</a>
        </li>
      </ul>
    </nav>
    -->
  </div>
</template>

<script>
import { reactive, watch, ref, computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import useNotyf from "../composable/useNotyf";
import { useI18n } from 'vue-i18n';
// import { Skeletor } from "vue-skeletor";
// import "vue-skeletor/dist/vue-skeletor.css";
import Swal from "sweetalert2";
export default {
  name: "Table",
  props: {
    headers: {
      type: Array,
      default: [],
    },
    data: {
      type: Object,
      default: {},
    },
    singleDelete: {
      type: Function,
    },
    multiDelete: {
      type: Function,
    },
    editPathName: {
      type: String,
    },
    addPathName: {
      type: String,
    },
    isDataLoading: {
      type: Boolean,
      default: false,
    },
  },
  // components: { Skeletor },
  setup(props, { emit }) {
    const router = useRouter();
    const notyf = useNotyf();
    const { t } = useI18n({})

    const sort = reactive({
      sortBy: null,
      sortDirection: "asc",
    });

    const currentPage = ref(1);
    const removeCheckboxParent = ref(null);
    const amountToShowPerPage = 10;
    const isDeleteLoading = ref(false);

    const selectAllCheckboxes = () => {
      const checkboxes = document.querySelectorAll(
        "input[type=checkbox]:not(#remove-checkbox-parent)"
      );

      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = !checkboxes[i].checked;
      }
    };

    const handleSort = async (sortByParam) => {
      sort.sortBy = sortByParam;
      if (sort.sortDirection === "asc") {
        sort.sortDirection = "desc";
      } else {
        sort.sortDirection = "asc";
      }
    };

    const handleEdit = (id) => {
      router.push({ name: props.editPathName, params: { id: id } });
    };

    const pagination = computed(() =>
      Math.ceil(props.data?.meta?.total / amountToShowPerPage)
    );

    const handlePageChange = (pageToChangeTo) => {
      currentPage.value = pageToChangeTo;
    };

    const handleDelete = async (id) => {
      Swal.fire({
        title: "Do you want to remove?",
        showDenyButton: true,
        confirmButtonText: "Remove",
        confirmButtonColor: "red",
        denyButtonColor: "grey",
      }).then(async (result) => {
        if (result.isConfirmed) {
          isDeleteLoading.value = true;
          try {
            await props.singleDelete(id);
            isDeleteLoading.value = false;
            notyf.success(t("Deleted successfully!"));

            emit("refreshed", sort, currentPage.value, () => {
              currentPage.value = currentPage.value - 1;
            });
          } catch (error) {
            notyf.error(t("Something went wrong, please try agian later!"));
            isDeleteLoading.value = false;
          }
        }
      });
    };

    const handleMultipleDeleteManufactures = async () => {
      let array = [];
      const checkboxes = document.querySelectorAll(
        "input[type=checkbox]:checked"
      );

      for (let i = 0; i < checkboxes.length; i++) {
        array.push(parseInt(checkboxes[i].value));
      }

      try {
        if (array.length > 0) {
          Swal.fire({
            title: "Do you want to remove?",
            showDenyButton: true,
            confirmButtonText: "Remove",
            confirmButtonColor: "red",
            denyButtonColor: "grey",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await props.multiDelete(array);
              removeCheckboxParent.value.checked = false;
              notyf.success(t("Deleted successfully!"));

              emit("refreshed", sort, currentPage.value, () => {
                currentPage.value = currentPage.value - 1;
              });
            }
          });
        } else {
          throw "You must check at least 1 checkbox to delete";
        }
      } catch (error) {
        notyf.error(
          error ||
            error.response.data ||
            $t("Something went wrong, please try again later)")
        );
        console.log(error);
      }
    };

    watch([sort, currentPage], () => {
      if ((sort.sortBy && sort.sortDirection) || currentPage.value) {
        emit("refreshed", sort, currentPage.value);
      }
      console.log(sort);
    });

    return {
      selectAllCheckboxes,
      handleSort,
      handleEdit,
      pagination,
      currentPage,
      handlePageChange,
      handleDelete,
      isDeleteLoading,
      handleMultipleDeleteManufactures,
      removeCheckboxParent,
      sort,
    };
  },
};
</script>


<style lang="scss" scoped>
.sortable p {
  color: #3c8dbc;
  cursor: pointer;
  margin: 0 !important;
  padding: 0 !important;
}

th p {
  margin: 0;
}

.actions a {
  font-size: 18px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f1f1;
  border: 1px solid #eeecec;
  text-align: center;
  border-radius: 20%;
  color: #2b2a2a;
}
</style>