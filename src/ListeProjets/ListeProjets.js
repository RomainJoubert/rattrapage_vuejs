import axios from 'axios'

//fonction pour rechercher un nom
function research(projectList, recherche) {
  let tab = [];
  for (let i = 0; i < projectList.length; i++) {
    if (projectList[i].name.toUpperCase().startsWith(recherche)) {
      tab.push(projectList[i]);
    }
  }
  return tab;
};


//fonction qui convertit et trie le tableau par date
function sortByDate(tab) {
  tab.sort(function (date1, date2) {
    return new Date(date1.createdAt) - new Date(date2.createdAt);
  })
  return tab;
};

//fonction pour supprimer un élément du tableau en enlevant l'élément du tableau
// function deleteElement (tab, id) {
//   for (let i = 0, i <tab.length; i++) {
//     if (id === tab[i].id) {
//       tab.splice(tab[i],1);
//     }
//   }
//   return tab;
// };

//fonction pour supprimer un élément du tableau en poussant dans un nouveau tableau
function deleteElement(tab, id) {
  let result = [];
  for (let i = 0; i < tab.length; i++) {
    if (id !== tab[i].id) {
      result.push(tab[i]);
    }
  }
  return result;
};

//ajoute un projet et le place en premier avec unshift
function addProject(tab, projet) {
  let result = tab;
  result.unshift(projet);
  return result;
}

// function update(tab, id) {
//   let newTab = tab;
//   let result = [];
//   for (let i = 0; i < newTab.length; i++) {
//     if (id === newTab[i].id) {
//       result.push(newTab[i]);
//     }
//   }
//   return result;
// };


import creation from '../ModalCreation.vue';
import ModalUpdate from '../ModalUpdate.vue'

export default {
  name: 'liste-projets',
  components: {'modal': creation,
    'modalUpdate': ModalUpdate},
  props: [],
  data() {
    return {
      showModal: false,
      search: '',
      projects: [],
      // projects: [
      //   {
      //     _id: '5b3e3da861f2d927949fa8da',
      //     isActive: false,
      //     picture: 'http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg',
      //     name: 'PUSHCART',
      //     creation: 'Tue Feb 25 1975 21:31:07 GMT+0100 (Central European Standard Time)',
      //   },
      //
      //   {
      //     _id: "5b3e3da860e7c6eeb88e3ceb",
      //     isActive: true,
      //     picture:"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     name: "ZENTURY",
      //     creation: "Sat May 25 1974 16:52:45 GMT+0100 (Central European Standard Time)"
      //   },
      //   {
      //     "_id": "5b3e3da85d52b4482e60904a",
      //     "isActive": false,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "POLARAX",
      //     "creation": "Mon Jun 27 1988 07:42:07 GMT+0200 (Central European Summer Time)"
      //   },
      //   {
      //     "_id": "5b3e3da830d91c6264ec2371",
      //     "isActive": true,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "BICOL",
      //     "creation": "Sat Feb 28 2009 15:57:42 GMT+0100 (Central European Standard Time)"
      //   },
      //   {
      //     "_id": "5b3e3da84172d52b597c35ca",
      //     "isActive": false,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "CYTREX",
      //     "creation": "Tue Oct 06 1970 07:07:42 GMT+0100 (Central European Standard Time)"
      //   },
      //   {
      //     "_id": "5b3e3da8bdabcef689e8f0d4",
      //     "isActive": false,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "PLAYCE",
      //     "creation": "Sun Aug 29 2010 07:52:18 GMT+0200 (Central European Summer Time)"
      //   },
      //   {
      //     "_id": "5b3e3da8f5132e9b61630c5e",
      //     "isActive": false,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "NETROPIC",
      //     "creation": "Fri Nov 17 1989 09:10:32 GMT+0100 (Central European Standard Time)"
      //   },
      //   {
      //     "_id": "5b3e3da83cec1f4a3f959388",
      //     "isActive": false,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "UNISURE",
      //     "creation": "Tue Aug 09 2005 02:26:51 GMT+0200 (Central European Summer Time)"
      //   },
      //   {
      //     "_id": "5b3e3da83319a70043710f9f",
      //     "isActive": true,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "CALCU",
      //     "creation": "Mon Jan 14 1980 12:08:39 GMT+0100 (Central European Standard Time)"
      //   },
      //   {
      //     "_id": "5b3e3da8dfc260a3993d2e64",
      //     "isActive": false,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "QUADEEBO",
      //     "creation": "Thu Jan 08 2009 03:25:20 GMT+0100 (Central European Standard Time)"
      //   },
      //   {
      //     "_id": "5b3e3da8a8b5ffda3cf89cc0",
      //     "isActive": true,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "PROXSOFT",
      //     "creation": "Sun Jan 04 1998 23:19:53 GMT+0100 (Central European Standard Time)"
      //   },
      //   {
      //     "_id": "5b3e3da87d3d148f090316ca",
      //     "isActive": true,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "VERBUS",
      //     "creation": "Mon Mar 12 1990 07:33:18 GMT+0100 (Central European Standard Time)"
      //   },
      //   {
      //     "_id": "5b3e3da8e734d6f18fd20d99",
      //     "isActive": false,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "FURNITECH",
      //     "creation": "Fri Jan 15 1971 15:23:19 GMT+0100 (Central European Standard Time)"
      //   },
      //   {
      //     "_id": "5b3e3da84769754f62adcd1e",
      //     "isActive": true,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "ZENTHALL",
      //     "creation": "Mon Sep 26 1994 07:13:17 GMT+0100 (Central European Standard Time)"
      //   },
      //   {
      //     "_id": "5b3e3da8e0ca663902594537",
      //     "isActive": false,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "BEADZZA",
      //     "creation": "Sun Dec 07 1975 14:46:01 GMT+0100 (Central European Standard Time)"
      //   },
      //   {
      //     "_id": "5b3e3da88c8a4ff9e7a470af",
      //     "isActive": true,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "ENERSOL",
      //     "creation": "Fri Oct 28 2016 03:41:22 GMT+0200 (Central European Summer Time)"
      //   },
      //   {
      //     "_id": "5b3e3da8971220d673089795",
      //     "isActive": true,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "ORBIN",
      //     "creation": "Wed Mar 17 1999 20:59:11 GMT+0100 (Central European Standard Time)"
      //   },
      //   {
      //     "_id": "5b3e3da8b36fc54ea95f52fe",
      //     "isActive": true,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "ANDRYX",
      //     "creation": "Sat Apr 20 2013 16:19:59 GMT+0200 (Central European Summer Time)"
      //   },
      //   {
      //     "_id": "5b3e3da8387a4b96cd64ac5c",
      //     "isActive": false,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "MARKETOID",
      //     "creation": "Wed Apr 14 2004 19:06:20 GMT+0200 (Central European Summer Time)"
      //   },
      //   {
      //     "_id": "5b3e3da8524620a282935367",
      //     "isActive": true,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "COMBOGENE",
      //     "creation": "Thu Apr 02 1998 14:13:33 GMT+0200 (Central European Summer Time)"
      //   },
      //   {
      //     "_id": "5b3e3da8bd1847d4bd46ceb3",
      //     "isActive": true,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "PASTURIA",
      //     "creation": "Fri Jan 26 1979 22:25:57 GMT+0100 (Central European Standard Time)"
      //   },
      //   {
      //     "_id": "5b3e3da83802b7161e97bcb5",
      //     "isActive": true,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "ECRAZE",
      //     "creation": "Sun Jul 30 1989 18:07:17 GMT+0200 (Central European Summer Time)"
      //   },
      //   {
      //     "_id": "5b3e3da81b7d9fdc1ac4a598",
      //     "isActive": false,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "KEEG",
      //     "creation": "Tue Nov 23 1976 03:32:12 GMT+0100 (Central European Standard Time)"
      //   },
      //   {
      //     "_id": "5b3e3da8408a1a197944bb07",
      //     "isActive": false,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "SHOPABOUT",
      //     "creation": "Sun Jun 24 1990 03:34:24 GMT+0200 (Central European Summer Time)"
      //   },
      //   {
      //     "_id": "5b3e3da855907b132f341230",
      //     "isActive": true,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "ZILLAR",
      //     "creation": "Mon Oct 10 2016 19:36:16 GMT+0200 (Central European Summer Time)"
      //   },
      //   {
      //     "_id": "5b3e3da8a72b0faaac30690b",
      //     "isActive": false,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "EQUITAX",
      //     "creation": "Fri Sep 11 1992 06:15:12 GMT+0200 (Central European Summer Time)"
      //   },
      //   {
      //     "_id": "5b3e3da85447219ab25178da",
      //     "isActive": false,
      //     "picture":"http://s1.lprs1.fr/images/2017/02/15/6683943_image-0016-0038_1000x625.jpg",
      //     "name": "DIGIPRINT",
      //     "creation": "Thu Dec 10 1981 23:31:45 GMT+0100 (Central European Standard Time)"
      //   },
      // ]
    }
  },

  computed: {
    listFiltered: function () {
      return research(this.projects, this.search.toUpperCase());
    }
  },
  mounted() {
  },

  methods: {
    filterByDate: function () {
      return sortByDate(this.projects);
    },

    filterReverse: function () {
      return sortByDate(this.projects).reverse();
    },

    add: function (projet) {
      this.projects = addProject(this.projects, projet);
    },

    supprime: function (id) {
      axios.delete('https://daily-standup-campus.herokuapp.com/api/projects/' + id + '?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMjNmODIzYTM5YjlmMDAxNGViNGJlNiIsImlhdCI6MTUzMTE0Mjg1MX0.K5e_nO1kl0sOOK8rvjYTiRkHPk2vBoGcSGY0Xh3zVQg')
        .then(response => {
          let newTab = deleteElement(this.projects, id);
          this.projects = newTab;
        })
        .catch(error => {
          this.error.push(error)
        })
    },


  },

  created() {
    axios.get('https://daily-standup-campus.herokuapp.com/api/projects?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMjNmODIzYTM5YjlmMDAxNGViNGJlNiIsImlhdCI6MTUzMTE0Mjg1MX0.K5e_nO1kl0sOOK8rvjYTiRkHPk2vBoGcSGY0Xh3zVQg')
      .then(response => {
        this.projects = response.data;
      })
      .catch(error => {
        this.error.push(error)
      })
  }
}
