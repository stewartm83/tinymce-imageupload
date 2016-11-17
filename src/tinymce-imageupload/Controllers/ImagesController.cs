using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using tinymce_imageupload.Infrastructure;

namespace tinymce_imageupload.Controllers
{
    public class ImagesController : ApiController
    {
     
      [Route("api/images/upload")]
        public async Task<IHttpActionResult> UploadImage()
        {
            var workingFolder = HttpContext.Current.Server.MapPath("~/images/" + DateTime.Today.ToString("ddMMyyyy"));
            if (!Directory.Exists(workingFolder))
            {
                Directory.CreateDirectory(workingFolder);
            }
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent("form-data"))
            {
                return BadRequest("Unsupported media type");
            }
            try
            {
                var provider = new CustomMultipartFormDataStreamProvider(workingFolder);
                await Request.Content.ReadAsMultipartAsync(provider);

                var file = provider.FileData.First();
                var fileInfo = new FileInfo(file.LocalFileName);

                return Ok(new {location = $"/images/{DateTime.Today.ToString("ddMMyyyy")}/{fileInfo.Name}"});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetBaseException().Message);
            }
        }
    }
}