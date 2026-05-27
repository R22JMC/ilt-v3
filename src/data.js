// Property data — curated subset representative of ILT's 33 properties
window.ILT_DATA = (() => {
  const props = [
    { id:'galley-keepers', name:"Keepers' House", parent:'galley-head', parentName:'Galley Head', location:'Co. Cork', region:'roi', categories:['lighthouses','city-town'], sleeps:4, bedrooms:2, from:420, dog:true, tag:'Lighthouse', blurb:"A working lighthouse keeper's residence on a wild Cork headland." },
    { id:'galley-assistant', name:"Assistant Keeper's", parent:'galley-head', parentName:'Galley Head', location:'Co. Cork', region:'roi', categories:['lighthouses'], sleeps:4, bedrooms:2, from:420, dog:false, tag:'Lighthouse', blurb:"The companion cottage at Galley Head, steps from the tower." },
    { id:'blackhead-1', name:'Blackhead Lightkeeper 1', parent:'blackhead', parentName:'Blackhead', location:'Co. Antrim', region:'ni', categories:['lighthouses','dog-friendly'], sleeps:6, bedrooms:3, from:520, dog:true, tag:'Lighthouse' },
    { id:'blackhead-2', name:'Blackhead Lightkeeper 2', parent:'blackhead', parentName:'Blackhead', location:'Co. Antrim', region:'ni', categories:['lighthouses','groups'], sleeps:8, bedrooms:4, from:680, dog:false, tag:'Lighthouse' },
    { id:'st-johns-sloop', name:"St. John's Point Sloop", location:'Co. Down', region:'ni', categories:['lighthouses','dog-friendly'], sleeps:4, bedrooms:2, from:380, dog:true, tag:'Lighthouse' },
    { id:'loop-head', name:'Loop Head Lightkeepers', location:'Co. Clare', region:'roi', categories:['lighthouses','groups'], sleeps:6, bedrooms:3, from:590, dog:false, tag:'Lighthouse' },
    { id:'wicklow-head', name:'Wicklow Head Lighthouse', location:'Co. Wicklow', region:'roi', categories:['lighthouses','romantic'], sleeps:4, bedrooms:2, from:540, dog:false, tag:'Lighthouse' },

    { id:'batty-langley', name:'Batty Langley Lodge', location:'Co. Meath', region:'roi', categories:['romantic','city-town'], sleeps:2, bedrooms:1, from:320, dog:false, tag:'Gatelodge' },
    { id:'salterbridge', name:'Salterbridge Gatelodge', location:'Co. Waterford', region:'roi', categories:['romantic','dog-friendly'], sleeps:2, bedrooms:1, from:280, dog:true, tag:'Gatelodge' },
    { id:'triumphal-arch', name:'Triumphal Arch Lodge', location:'Co. Monaghan', region:'roi', categories:['romantic'], sleeps:2, bedrooms:1, from:260, dog:false, tag:'Gatelodge' },
    { id:'magherintemple', name:'Magherintemple Lodge', location:'Co. Antrim', region:'ni', categories:['romantic','dog-friendly'], sleeps:2, bedrooms:1, from:240, dog:true, tag:'Gatelodge' },

    { id:'termon', name:'Termon House', location:'Co. Donegal', region:'roi', categories:['dog-friendly','groups'], sleeps:8, bedrooms:4, from:720, dog:true, tag:'Country House' },
    { id:'tullymurry', name:'Tullymurry House', location:'Co. Down', region:'ni', categories:['groups','dog-friendly'], sleeps:10, bedrooms:5, from:860, dog:true, tag:'Country House' },
    { id:'killee', name:'Killee Cottage', location:'Co. Galway', region:'roi', categories:['dog-friendly'], sleeps:4, bedrooms:2, from:340, dog:true, tag:'Cottage' },
    { id:'schoolhouse', name:'Schoolhouse at Annaghmore', location:'Co. Sligo', region:'roi', categories:['dog-friendly','groups'], sleeps:6, bedrooms:3, from:460, dog:true, tag:'Schoolhouse' },
    { id:'goggin', name:'Goggin Cottage', location:'Co. Cork', region:'roi', categories:['romantic','dog-friendly'], sleeps:2, bedrooms:1, from:250, dog:true, tag:'Cottage' },
    { id:'kiln-wing', name:'Kiln Wing, Old Corn Mill', location:'Bushmills, Co. Antrim', region:'ni', categories:['city-town'], sleeps:4, bedrooms:2, from:390, dog:false, tag:'Mill' },
    { id:'railway', name:'Railway Crossing Cottage', location:'Co. Donegal', region:'roi', categories:['dog-friendly','romantic'], sleeps:3, bedrooms:2, from:280, dog:true, tag:'Cottage' },
    { id:'anne-grove', name:"Annes Grove Miniature Castle", location:'Co. Cork', region:'roi', categories:['romantic','city-town'], sleeps:2, bedrooms:1, from:360, dog:false, tag:'Folly' },
  ];

  // Rough lat/lng for map plotting (approximate)
  const coords = {
    'galley-keepers':[51.533,-8.953], 'galley-assistant':[51.533,-8.953],
    'blackhead-1':[54.759,-5.688], 'blackhead-2':[54.759,-5.688],
    'st-johns-sloop':[54.222,-5.648], 'loop-head':[52.563,-9.931],
    'wicklow-head':[52.972,-5.998], 'batty-langley':[53.648,-6.685],
    'salterbridge':[52.146,-7.843], 'triumphal-arch':[54.223,-7.050],
    'magherintemple':[55.174,-6.233], 'termon':[55.068,-8.341],
    'tullymurry':[54.307,-5.919], 'killee':[53.313,-9.675],
    'schoolhouse':[54.001,-8.362], 'goggin':[51.876,-8.509],
    'kiln-wing':[55.204,-6.517], 'railway':[54.843,-8.293],
    'anne-grove':[52.085,-8.492],
  };
  props.forEach(p => p.coords = coords[p.id]);

  const categories = [
    { id:'lighthouses', name:'Lighthouses', blurb:'Sleep where the light once burned. Working-era keepers\' houses on wild, weather-sculpted coastlines.', count: props.filter(p=>p.categories.includes('lighthouses')).length },
    { id:'romantic',    name:'Romantic',    blurb:'Intimate gate lodges, follies and lookouts built for two — with a fireplace and a quiet window over history.', count: props.filter(p=>p.categories.includes('romantic')).length },
    { id:'dog-friendly',name:'Dog-Friendly',blurb:'Bring the dog. Coastal walks, country paths and properties that welcome a four-legged companion.', count: props.filter(p=>p.categories.includes('dog-friendly')).length },
    { id:'groups',      name:'Groups',      blurb:'Houses large enough for the whole party — reunions, retreats, milestone gatherings under one historic roof.', count: props.filter(p=>p.categories.includes('groups')).length },
    { id:'city-town',   name:'City & Town', blurb:'Heritage stays within the hum of a town — walk to the restaurant, cycle to the castle, dine by the harbour.', count: props.filter(p=>p.categories.includes('city-town')).length },
    { id:'itineraries', name:'Itineraries', blurb:'Road-tested, hand-written routes linking our properties across a week of driving, walking and wandering.', count: 12 },
  ];

  const counties = [...new Set(props.map(p => p.location.replace(/^.*Co\. /,'Co. ')))].sort();

  return { props, categories, counties };
})();

// Currency by region — Northern Ireland properties price in £, Republic in €
window.ILT_CUR = (p) => (p && p.region === 'ni') ? '£' : '€';
