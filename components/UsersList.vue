<template>
  <div class="section">
    <h3 class="title">Users</h3>
    <table class="table table-hover" v-if="users.length > 0">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">EMAIL</th>
          <th scope="col">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user._id }}</td>
          <td>{{ user.name }}</td>
          <td>
            <a>{{ user.email }}</a>
          </td>
          <td>
            <button class="btn-sm" @click="editProfile(user._id)">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteUser(user._id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <div class="section">
        <p>No User found</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$store.state.users;
    }
  },
  methods: {
    editProfile(id) {
      let userProfileData = this.$store.getters.getUserById(id);
      userProfileData.id = userProfileData._id;
      console.log(userProfileData);
      const data = {
        show: true,
        userProfile: userProfileData
      };
      this.$store.commit("showEditProfileModal", data);
    },
    deleteUser(id) {
      const data = {
        show: true,
        id,
        type: "user"
      };
      this.$store.commit("showConfirmDeleteModal", data);
    }
  }
};
</script>

<style></style>
