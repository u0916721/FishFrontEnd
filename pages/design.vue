<template>
  <div class="">
    <div class="px-4 grid grid-cols-3">
      <div class="py-1"></div>
      <button
        class="
          col-start-1 col-end-2
          transition
          delay-150
          duration-300
          rounded
          w-96
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded
          ease-in-out
          hover:-translate-y-1 hover:scale-110
          shadow
        "
        @click="this.$router.push('/')"
      >
        Home
      </button>
      <div class="py-2 col-start-1 col-end-2"></div>
      <div
        class="
          px-2
          font-bold
          text-2xl
          col-start-1 col-end-2
          rounded
          px-auto
          bg-gradient-to-r
          from-indigo-400
        "
      >
        The Front End
      </div>
      <div class="py-1 col-start-1"></div>
      <div
        class="
          px-2
          font-mono
          text-l
          col-start-1 col-end-4
          rounded
          px-auto
          bg-amber-100
          hover:border-solid hover:border-2 hover:border-indigo-600
        "
      >
        I chose Nuxt.js version 3 as my front-end framework. There were several
        reasons for this choice. One is that Vue frameworks are easy to use, and
        its components allow for easy abstraction and quick UI design. I chose
        Nuxt over plain Vue for one reason and that is search engine
        optimization, server-side rendered Nuxt excels in SEO, I can easily
        customize metadata and implement dynamic metadata with the head tag that
        Nuxt gives. Publishing a Nuxt application is also fairly trivial and
        only took me a few minutes to do on netlify, all I had to was connect
        the github repo and press deploy.
      </div>
      <div class="py-5"></div>
      <div
        class="
          px-2
          font-bold
          text-2xl
          col-start-1 col-end-2
          rounded
          px-auto
          bg-gradient-to-r
          from-indigo-400
        "
      >
        Downsides of nuxt
      </div>
      <div class="py-1 col-start-1"></div>
      <div
        class="
          px-2
          font-mono
          text-l
          col-start-1 col-end-4
          rounded
          px-auto
          bg-amber-100
          hover:border-solid hover:border-2 hover:border-indigo-600
        "
      >
        One thing I detest about using Nuxt is their state management system
        Pinia, while it works well as advertised, I found picking it up and
        using it to be particularly painful and confusing, I found the syntax to
        be particularly unintuitive, especially importing and exporting the
        store object. I picked it up eventually but it wasn't my favorite thing
        to do.
      </div>
      <div class="py-5"></div>
      <div
        class="
          px-2
          font-bold
          text-2xl
          col-start-1 col-end-2
          rounded
          px-auto
          bg-gradient-to-r
          from-indigo-400
        "
      >
        The Back End
      </div>
      <div class="py-1 col-start-1"></div>
      <div
        class="
          px-2
          font-mono
          text-l
          col-start-1 col-end-4
          rounded
          px-auto
          bg-amber-100
          hover:border-solid hover:border-2 hover:border-indigo-600
        "
      >
        For the backend, I used .net core web API, one reason being that visual
        studio is an incredibly powerful IDE that has introduced new features
        such as smart code autocomplete, which sped up my development time quite
        a bit. I also found features like scaffolding and its built-in
        publishing to also save time as well. I was going to do Java spring
        initially as I have quite a bit of experience with using it for work,
        but I found implementing authentication and authorization in spring with
        JWTs to be an absolute nightmare, given that they had recently changed
        their approved mode of authentication to SecurityFilterChain and
        depreciated their previous class WebSecurityAdapter (Java has been
        having a lot of issues with security lately as well), there were very
        little tutorials on how to use this new class with JWT. Java is my
        favorite language and I like Spring but I really didn't want to spend
        that much time on something that as it turns out .net core can implement
        incredibly easily. .net core can also work with docker, like java
        spring, and can be deployed that way but I just used Microsoft Azure
        deployment that is built into visual studio since I have a bunch of free
        credits on there. Though there is a docker file in the repo if you so
        desire to publish it that way
      </div>
      <div class="py-5"></div>
      <div
        class="
          px-2
          font-bold
          text-2xl
          col-start-1 col-end-2
          rounded
          px-auto
          bg-gradient-to-r
          from-indigo-400
        "
      >
        Authentication and Authorization
      </div>
      <div class="py-1 col-start-1"></div>
      <div
        class="
          px-2
          font-mono
          text-l
          col-start-1 col-end-4
          rounded
          px-auto
          bg-amber-100
          hover:border-solid hover:border-2 hover:border-indigo-600
        "
      >
        I chose to use JWT for authentication and authorization, I was initially
        thinking about using oAuth with a social authentication provider like
        auth0 but it's incredibly expensive, and I really wanted to minimize the
        number of services I depended on. A JWT-only authentication approach fit
        my use case rather well, it was easy to implement and easy for me to
        debug, given the online tools that can decode JWT.
      </div>
      <div class="py-5"></div>
      <div
        class="
          px-2
          font-bold
          text-2xl
          col-start-1 col-end-2
          rounded
          px-auto
          bg-gradient-to-r
          from-indigo-400
        "
      >
        Database
      </div>
      <div class="py-1 col-start-1"></div>
      <div
        class="
          px-2
          font-mono
          text-l
          col-start-1 col-end-4
          rounded
          px-auto
          bg-amber-100
          hover:border-solid hover:border-2 hover:border-indigo-600
        "
      >
        For my database, I used MongoDB a no SQL database where entries are JSON
        objects, while a traditional database works fine, I found it to
        complicate the project. For me local development was made easier as I
        could simply deploy a MongoDB container and connect to it that way,
        Atlassian also offers a cloud service for MongoDB, and connecting to it
        is incredibly easy, it is just a string and that's it, where as in the
        past I've had to run a MySQL database on some AWS machine open the ports
        on the machine, create a MySQL user for the database(which can be
        somewhat complicated) and then update that user in .net core framework.
        Using MongoDB was very easy. I added a password hasher to store hashed
        passwords into the DB, since I couldn't find how to make the identity
        framework work with MongoDB as it does with SQL databases, though this
        might be something I will revisit later. Regardless adding a hashing
        algorithm wasn't bad at all.
      </div>
      <div class="py-5"></div>
      <div
        class="
          px-2
          font-bold
          text-2xl
          col-start-1 col-end-2
          rounded
          px-auto
          bg-gradient-to-r
          from-indigo-400
        "
      >
        UI styling
      </div>
      <div class="py-1 col-start-1"></div>
      <div
        class="
          px-2
          font-mono
          text-l
          col-start-1 col-end-4
          rounded
          px-auto
          bg-amber-100
          hover:border-solid hover:border-2 hover:border-indigo-600
        "
      >
        For styling, I started out using bootstrap as that is what I have
        experience in, but after doing research into tailwind CSS, I gave it a
        try and found it to be much better than bootstrap, tailwind is way more
        customizable but can also use flexbox just like bootstrap, I found
        styling to be much quicker and easier when using tailwind than I ever
        have using bootstrap.
      </div>
      <div class="py-5"></div>
      <div
        class="
          px-2
          font-bold
          text-2xl
          col-start-1 col-end-2
          rounded
          px-auto
          bg-gradient-to-r
          from-indigo-400
        "
      >
        Github repos
      </div>
      <div class="py-1 col-start-1"></div>
      <div
        class="
          px-2
          font-mono
          text-l
          col-start-1 col-end-4
          rounded
          px-auto
          bg-amber-100
          hover:border-solid hover:border-2 hover:border-indigo-600
        "
      >
        The repos for both the frontend and backend are public, I tried to make
        the backend repo clear for those who haven't used .net core before, but
        please read the readme to mitigate any potential security issues! Here
        are the links ->
        <NuxtLink
          class="text-blue-500 underline hover:text-blue-700"
          to="https://github.com/u0916721/FishFrontEnd"
          >Front End</NuxtLink
        >
        <NuxtLink
          class="text-blue-500 underline hover:text-blue-700"
          to="https://github.com/u0916721/FishAuctionBackend"
          >Back End</NuxtLink
        >
      </div>
      <div class="py-5"></div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  data() {
    return {
      name: "",
      pictures:
        "https://aquariumadviser.com/wp-content/uploads/2019/05/Exotic-and-Cool-Freshwater-Aquarium-Fish.jpg",
      carelink: "",
      size: "",
      maintenance: "",
      waterConditions: "",
    };
  },
  created() {},
  mounted() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos.coords.latitude + "," + pos.coords.longitude);
        this.addHit(pos.coords.latitude + "," + pos.coords.longitude);
      },
      (err) => {
        this.addHit("Location not shared ");
        console.log("error");
      }
    );
    this.getLocation();
  },
  computed() {},
  methods: {
    getLocation() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("https://ipinfo.io/json", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
    addHit(info) {
      var myHeaders = new Headers();

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://plaxbackendapi.azurewebsites.net/user/Jens/" +
          info +
          "/addVistInfo",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style>
</style>