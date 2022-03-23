
define([

  "esri/tasks/QueryTask",
  "esri/tasks/query",
  "esri/SpatialReference",

  'dojo/_base/lang',

  "esri/graphic",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/Color",


  'dojo/_base/declare',
  'jimu/BaseWidget'],

  function (
    QueryTask,
    Query,
    SpatialReference,

    lang,

    Graphic,
    SimpleFillSymbol,
    SimpleLineSymbol,
    Color,


    declare,
    BaseWidget) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-BuscadorParroquias',

      //this property is set by the framework when widget is loaded.
      //name: 'CustomWidget',


      //methods to communication with app container:

      postCreate: function () {

        console.log('postCreate');
      },

      startup: function () {

        console.log('startup');
      },

      onOpen: function () {
        console.log('onOpen');
      },



      cargaConcellos: function () {


        console.log("Provincia", this.selectProvincia.value);
        let codigoProvincia = this.selectProvincia.value;
        if (codigoProvincia == -1) { return };
        this.listaConcellos.innerHTML = "";

        console.log("Servicio de los concellos", this.config.concellosService)

        const queryTask = new QueryTask(this.config.concellosService);

        const query = new Query();
        query.returnGeometry = false;

        query.outFields = ["CODCONC", "CONCELLO", "CODPROV"];
        query.where = `CODPROV=${this.selectProvincia.value}`;

        console.log("querycon", query);

        queryTask.execute(query, lang.hitch(this, function (results) {

          console.log("results", results)

          opt = document.createElement("option");
          opt.value = "-1";
          opt.innerHTML = "Selecciona un concello";
          this.listaConcellos.add(opt);

          for (var i = 0; i < results.features.length; i++) {
            opt = document.createElement("option");
            opt.value = results.features[i].attributes.CODCONC;
            opt.innerHTML = results.features[i].attributes.CONCELLO;
            this.listaConcellos.add(opt);
          }

        }))


      },




      cargaParroquias: function () {

        console.log("Concello", this.listaConcellos.value);
        let Concello = this.listaConcellos.value;
        if (Concello == "") { return };
        this.listaParroquias.innerHTML = "";

        console.log("Servicio de las Parroquias", this.config.concellosService)

        const queryTask = new QueryTask(this.config.parroquiasService);

        const query = new Query();
        query.returnGeometry = false;

        query.outFields = ["CODPARRO", "PARROQUIA ", "CODCONC"];
        query.where = `CODCONC=${this.listaConcellos.value}`;

        console.log("queryparro", query);

        queryTask.execute(query, lang.hitch(this, function (results) {

          console.log("results", results)

          opt = document.createElement("option");
          opt.value = "-1";
          opt.innerHTML = "Selecciona una Parroquia";
          this.listaParroquias.add(opt);

          for (var i = 0; i < results.features.length; i++) {
            opt = document.createElement("option");
            opt.value = results.features[i].attributes.CODPARRO;
            opt.innerHTML = results.features[i].attributes.PARROQUIA;
            this.listaParroquias.add(opt);
          }

        }))


      },




      zoomConcello: function () {

        console.log("Concello", this.selectProvincia.value);
        let codigoProvincia = this.selectProvincia.value;
        if (codigoProvincia == -1) { return };
        

        console.log("Servicio de los concellos", this.config.concellosService)

        const queryTask = new QueryTask(this.config.concellosService);

        const query = new Query();
        query.returnGeometry = true;
        query.outSpatialReference = new SpatialReference(102100);
        query.outFields = ["CODCONC", "CONCELLO", "CODPROV"];
        query.where = `CODPROV=${this.selectProvincia.value}`;

        console.log("querycon", query);

        queryTask.execute(query, lang.hitch(this, function (results) {

          console.log("results3", results);
          if (results.features.length > 0) {
            var geometria = results.features[0].geometry;
            this.map.graphics.clear();


            var line = new SimpleLineSymbol();
            line.setColor(new Color([26, 26, 26, 1]));
            var fill = new SimpleFillSymbol();
            fill.setColor(new Color([0, 197, 255, 0.25]));
            fill.setOutline(line);


            var graphic = new Graphic(geometria, fill);

            this.map.graphics.add(graphic);

            this.map.setExtent(geometria.getExtent(), true);

          }



        }))

      },



      zoomParroquia: function () {
        console.log("Concello", this.listaConcellos.value);
        let Concello = this.listaConcellos.value;
        if (Concello == "") { return };
        

        console.log("Servicio de las Parroquias", this.config.parroquiasService)

        const queryTask2 = new QueryTask(this.config.parroquiasService);

        const query2 = new Query();

        query2.returnGeometry = true;

        query2.outSpatialReference = new SpatialReference(102100);

        query2.outFields = ["CODPARRO", "PARROQUIA ", "CODCONC"];
        query2.where = `CODPARRO=${this.listaParroquias.value}`;

        console.log("queryparro", query2);

        queryTask2.execute(query2, lang.hitch(this, function (results) {

          console.log("results4", results);
          if (results.features.length > 0) {
            var geometria2 = results.features[0].geometry;
            this.map.graphics.clear();


            var line = new SimpleLineSymbol();
            line.setColor(new Color([26, 26, 26, 1]));
            var fill = new SimpleFillSymbol();
            fill.setColor(new Color([0, 197, 255, 0.25]));
            fill.setOutline(line);


            var graphic2 = new Graphic(geometria2, fill);

            this.map.graphics.add(graphic2);

            this.map.setExtent(geometria2.getExtent(), true);

          }



        }))
      },



      onClose: function () {
        console.log('Que pena que se cierre :(');
      },

      // onMinimize: function(){
      //   console.log('onMinimize');
      // },

      // onMaximize: function(){
      //   console.log('onMaximize');
      // },

      // onSignIn: function(credential){
      //   /* jshint unused:false*/
      //   console.log('onSignIn');
      // },

      // onSignOut: function(){
      //   console.log('onSignOut');
      // }

      // onPositionChange: function(){
      //   console.log('onPositionChange');
      // },

      // resize: function(){
      //   console.log('resize');
      // }

      //methods to communication between widgets:

    });
  });