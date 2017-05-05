def create_users(N):
    ls = []
    for i in range(1, N+1):
        ls.append(("test{0}".format(i), "test{0}passwd".format(i)))
    return ls
