import { Link } from "react-router-dom";
export const Footer = () => {
  return <div style={
    {backgroundColor: "#1a202c", color: "white", padding: "20px" }
  }>
    <footer className="footer sm:footer-horizontal  text-white-500-content p-10 flex flex-row height-20 justify-between items-center">
  
 

   <div className="basis-3xs flex flex-col items-center mx-4 text-white" > <b> B4f shop </b><br />
   
   B4f shop is a factory brand produced by Roopa Knitting <br /> Mills, the makers of the world's  <br />highest quality knit fabrics and apparel. </div>



<div>
   
   <b> <h1 className="footer-title">Social</h1></b>
   <div><a href="https://www.facebook.com/">Facebook</a></div>
  <div> <a href="https://www.instagram.com/"> Instagram</a></div>
<div><a href="https://x.com/X.">X</a></div>
 
  
 </div>

  <div className="basis-3xs flex flex-col items-center mx-4" >
   
    <b> <div >informaction</div></b> 
     <Link 
    
      to="/about" className="text-white hover:underline">About us</Link>
  <Link to="/contact" className="text-white hover:underline">Contact us</Link>
    <Link to="/Shipping & Returns" className="text-white hover:underline">Shipping & Returns</Link>
<Link to="/wholesale" className="text-white hover:underline">wholesale</Link>
  </div>
<div> Join our newsletter to stay up to <br /> date on features and releases.
  <br />
<input
  type="text"
  placeholder="enter your email"
  className="input input-bordered join-item w-64 h-10 px-4 py-2 border-2 border-gray-400 bg-white text-black rounded"
/>
  
  </div>

 <button
    className="btn join-item h-10 ml-2 px-6 py-2 rounded bg-yellow-300 text-black font-bold border-2 border-yellow-400 hover:bg-yellow-400 hover:text-white transition-colors duration-200 shadow-md"
  >
    Subscribe
  </button>

 

</footer>
 <div ><hr /></div> 
 <div className="text-center mt-4 text-white    ">
           
               &copy;  B4f shop. All Rights Reserved<br /> 2025
            </div>
          
  </div>



};
