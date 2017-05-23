class MyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, DELETE'
        response['Access-Control-Max-Age'] = 1000
        # note that '*' is not valid for Access-Control-Allow-Headers
        response['Access-Control-Allow-Headers'] = 'origin, x-csrftoken, content-type, accept, authorization'
        return response
    

# for django version <1.10:s
class EEE:
    def process_response(self, request, response):
        response['Access-Control-Allow-Origin'] = '*'
        return response
