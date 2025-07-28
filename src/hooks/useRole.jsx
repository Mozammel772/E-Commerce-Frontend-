import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: role, isLoading, error } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/users/role/${user.email}`);
        return data.role;
      } catch (err) {
        console.error('Error fetching role:', err); // 🔍 See full error
        throw err; // rethrow so React Query handles it properly
      }
    },
  });


  console.log("user", user, role);
  return { role, isLoading, error };
};

export default useRole;



// new
// import { useQuery } from '@tanstack/react-query';
// import useAuth from './useAuth';
// import useAxiosSecure from './useAxiosSecure';

// const useRole = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user, loading } = useAuth();

//   const {
//     data: role = null,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ['role', user?.email ?? ''],
//     enabled: !loading && !!user?.email,
//     queryFn: async () => {
//       if (!user?.email) throw new Error("User email missing");
//       console.log("🔥 Axios hitting role endpoint:", user.email);
//       const res = await axiosSecure(`/users/role/${user.email}`);
//       console.log("res", res)
//       return res.data?.role ?? 'guest';
//     },

//     staleTime: 1000 * 60 * 5, // optional: cache for 5 minutes
//     retry: 1, // retry once if failed
//   });

//   if (process.env.NODE_ENV === 'development') {
//     console.log('[useRole] user:', user);
//     console.log('[useRole] role:', role);
//     console.log('[useRole] user.email:', user?.email);
//   }

//   return { role, isLoading, isError, error };
// };

// export default useRole;
