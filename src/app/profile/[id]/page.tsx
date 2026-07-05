export default function UserProfilePage({params}: any){
    return (
        <div>
            <h1>Profile-Page</h1>
            <p>Profile page of user: {params.id}</p>
        </div>
    )
}