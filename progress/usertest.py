def create_users(N):
    ls = []
    for i in range(1, N):
        ls.append(("user{0}".format(i), "user{0}passwd".format(i)))
    return ls
