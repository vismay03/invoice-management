import http from "@/service/common";

class Service {
    async get(url: string) {
        return await http.get(url);
    }

    create(url: string, data: any) {
        return http.post(url, data);
    }

    async edit(url: string) {
        http
        return await http.get(url);
    }

    update(url: string, data: any) {
        data['_method'] = 'PUT';
        return http.post(url, data);
    }

    destroy(url: string) {
        return http.delete(url);
    }

    multiDestroy(url: string) {
        return http.delete(url);
    }



}


export default new Service();
