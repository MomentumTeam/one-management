using os_server.Models;
using os_server.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using System;

namespace os_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FaqController : ControllerBase
    {
        private readonly FaqService _FaqService;

        public FaqController(FaqService FaqService)
        {
            _FaqService = FaqService;
        }

        [HttpGet]
        public ActionResult<List<MongoFaqObj>> GetAll()
        {

            try
            {
                List<MongoFaqObj> allFaq = _FaqService.Get();

                return allFaq;
            }
            catch (Exception err)
            {
                return Content("Exception "+ err);

            }
        }

        [HttpPost]
        public IActionResult Add([FromBody] MongoFaqObj faqObj)
        {
            try
            {
                MongoFaqObj obj = _FaqService.Create(faqObj);
                ReturnDto ret = new ReturnDto(true, obj.Id.ToString());
              
                return Ok(ret);
            }
            catch (Exception e)
            {
                return StatusCode(500, new ReturnDto(false, e.Message));
            }

        }


        [HttpDelete("remove")]
        public IActionResult Remove([FromBody] MongoFaqObj obj)
        {
            try
            {
                _FaqService.Remove(obj.Id);
                ReturnDto ret = new ReturnDto(true, "ההודעה נמחקה בהצלחה!");

                return Ok(ret);
            }
            catch (Exception e)
            {
                return StatusCode(500, new ReturnDto(false, e.Message));
            }

        }

    }
}