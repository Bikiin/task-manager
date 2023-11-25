export default {
    //to get ip: docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' server
    API: import.meta.env.VITE_API,
}