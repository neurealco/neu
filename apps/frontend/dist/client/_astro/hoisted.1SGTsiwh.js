const t=document.getElementById("refresh-stats");t&&t.addEventListener("click",async()=>{try{const e=await fetch("undefined/dashboard/refresh",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"}});if(!e.ok){const s=await e.json();throw new Error(s.error||"Failed to refresh stats")}const r=await e.json();if(r.success)alert("Stats refreshed successfully!"),window.location.reload();else throw new Error(r.message||"Refresh failed")}catch(e){console.error("Refresh error:",e);const r=e;let s=r.message||"Error refreshing stats";r.message.includes("Insufficient credits")&&(s=`${r.message}

Please complete surveys to earn more credits.`),alert(s)}});
