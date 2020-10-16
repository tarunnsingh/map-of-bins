export default {
  nearestDustbin: async (data) => {
    const res = await fetch(
      `/api/dustbins/nearest?long=${data.long}&lat=${data.lat}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) return res.json().then((data) => data);
    else
      return {
        dustbinsFound: null,
        dustbinError: true,
      };
  },

  addDustbin: async (dustbin) => {
    const res = await fetch(`/api/dustbins/add`, {
      method: "post",
      body: JSON.stringify(dustbin),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) return res.json().then((data) => data);
    else
      return {
        dustbinAdded: null,
        dustbinError: true,
      };
  },
};
